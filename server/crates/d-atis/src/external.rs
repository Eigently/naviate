use serde::Deserialize;
use thiserror::Error;

#[derive(Deserialize)]
pub struct ExternalAPIResponse {
  pub datis: String,
  pub r#type: String,
}

#[derive(Deserialize)]
pub struct ExternalAPIError {
  pub error: String,
}

#[derive(Debug, Error)]
pub enum CallExternalAPIError {
  #[error("Invalid ICAO Code")]
  InvalidICAOCode,
  #[error("Unknown Error")]
  UnknownError,
}

pub async fn call_external_api(
  icao_code: &String,
) -> Result<Vec<ExternalAPIResponse>, CallExternalAPIError> {
  let api_call_response = reqwest::get(format!("https://datis.clowd.io/api/{}", icao_code))
    .await
    .map_err(|_| CallExternalAPIError::UnknownError)?
    .bytes()
    .await
    .map_err(|_| CallExternalAPIError::UnknownError)?;

  if serde_json::from_slice::<ExternalAPIError>(&api_call_response).is_ok() {
    return Err(CallExternalAPIError::InvalidICAOCode);
  }

  let airport_data_array = serde_json::from_slice::<Vec<ExternalAPIResponse>>(&api_call_response)
    .map_err(|_| CallExternalAPIError::UnknownError)?;

  Ok(airport_data_array)
}
