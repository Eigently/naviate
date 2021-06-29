use serde::Serialize;
use thiserror::Error;

use crate::external;

#[derive(Debug, Serialize, Default)]
pub struct GetDAtisResponse {
  pub airport: String,
  pub d_atis_type: String,
  pub d_atis_combined: Option<String>,
  pub d_atis_departure: Option<String>,
  pub d_atis_arrival: Option<String>,
}

#[derive(Error, Debug)]
pub enum GetDAtisError {
  #[error("Invalid D-ATIS API Response")]
  DAtisAPIError,

  #[error("Invalid ICAO Code")]
  InvalidICAOCode,

  #[error("Unknown Error")]
  UnknownError,
}

pub async fn get_d_atis(icao_code: &String) -> Result<GetDAtisResponse, GetDAtisError> {
  let airport_data_array = external::call_external_api(icao_code)
    .await
    .map_err(|e| match e {
      external::CallExternalAPIError::InvalidICAOCode => GetDAtisError::InvalidICAOCode,
      external::CallExternalAPIError::UnknownError => GetDAtisError::UnknownError,
    })?;
  if airport_data_array.len() == 0 {
    return Err(GetDAtisError::DAtisAPIError);
  }

  let mut d_atis_type = "SEPARATED".to_string();
  let mut d_atis_combined = None;
  let mut d_atis_arrival = None;
  let mut d_atis_departure = None;

  airport_data_array.into_iter().for_each(|airport_data| {
    match airport_data.r#type.as_str() {
      "combined" => {
        d_atis_type = "COMBINED".to_string();
        d_atis_combined = Some(airport_data.datis.clone())
      }
      "dep" => d_atis_arrival = Some(airport_data.datis.clone()),
      "arr" => d_atis_departure = Some(airport_data.datis.clone()),
      _ => {}
    };
  });

  Ok(GetDAtisResponse {
    airport: icao_code.to_uppercase(),
    d_atis_type,
    d_atis_combined,
    d_atis_arrival,
    d_atis_departure,
  })
}
