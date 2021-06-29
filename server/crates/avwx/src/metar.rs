use serde::Deserialize;
use thiserror::Error;

#[derive(Deserialize)]
pub struct ExternalAPIResponse {
  pub sanitized: String,
}

#[derive(Deserialize)]
pub struct ExternalAPIError {
  pub error: String,
}

#[derive(Debug, Error)]
pub enum CallExternalAPIError {
  #[error("Invalid Station")]
  InvalidStation,
  #[error("Unknown Error")]
  UnknownError,
}

pub async fn call_external_api(
  station: &String,
) -> Result<ExternalAPIResponse, CallExternalAPIError> {
  let api_call_response = reqwest::get(format!(
    "https://avwx-api.naviate.xyz/api/metar/{}",
    station
  ))
  .await
  .map_err(|_| CallExternalAPIError::UnknownError)?
  .bytes()
  .await
  .map_err(|_| CallExternalAPIError::UnknownError)?;

  if serde_json::from_slice::<ExternalAPIError>(&api_call_response).is_ok() {
    return Err(CallExternalAPIError::InvalidStation);
  }

  Ok(
    serde_json::from_slice::<ExternalAPIResponse>(&api_call_response)
      .map_err(|_| CallExternalAPIError::UnknownError)?,
  )
}
