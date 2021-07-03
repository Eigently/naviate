use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Deserialize, Serialize, Debug)]
#[serde(untagged)]
pub enum DAtisData {
  Combined(DAtisCombinedData),
  Separated(DAtisSeparatedData),
}

#[derive(Deserialize, Serialize, Debug)]
pub struct DAtisCombinedData {
  combined: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct DAtisSeparatedData {
  arrival: String,
  departure: String,
}

#[derive(Deserialize, Serialize, Debug)]
pub struct DAtis {
  pub airport: String,
  pub data: DAtisData,
}

#[derive(Deserialize, Debug)]
struct ExternalAPIError {
  pub code: u16,
  pub error: String,
  pub message: String,
}

#[derive(Debug, Error)]
pub enum GetDAtisError {
  #[error("No table entry")]
  NoEntry(String),

  #[error("Exclusively have arrival D-ATIS but not departure")]
  OnlyArrival(String),

  #[error("Exclusively have departure D-ATIS but not arrival")]
  OnlyDeparture(String),

  #[error("Unknown error")]
  UnknownError,
}

pub async fn get_d_atis(icao_code: &String) -> Result<DAtis, GetDAtisError> {
  let api_call_response = reqwest::get(format!("https://d-atis-api.naviate.xyz/{}", icao_code))
    .await
    .map_err(|_| GetDAtisError::UnknownError)?;

  let api_call_bytes = api_call_response
    .bytes()
    .await
    .map_err(|_| GetDAtisError::UnknownError)?;

  if let Ok(e) = serde_json::from_slice::<ExternalAPIError>(&api_call_bytes) {
    match e.error.as_str() {
      "no_entry" => return Err(GetDAtisError::NoEntry(e.message)),
      "only_arrival" => return Err(GetDAtisError::OnlyArrival(e.message)),
      "only_departure" => return Err(GetDAtisError::OnlyDeparture(e.message)),
      _ => return Err(GetDAtisError::UnknownError),
    }
  }

  let result =
    serde_json::from_slice::<DAtis>(&api_call_bytes).map_err(|_| GetDAtisError::UnknownError)?;

  Ok(result)
}
