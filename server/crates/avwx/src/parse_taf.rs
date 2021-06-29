use serde::Serialize;
use thiserror::Error;

use crate::taf;

#[derive(Debug, Serialize, Default)]
pub struct GetTafResponse {
  pub airport: String,
  pub taf: String,
}

#[derive(Error, Debug)]
pub enum GetTafError {
  #[error("Invalid Station")]
  InvalidStation,

  #[error("Unknown Error")]
  UnknownError,
}

pub async fn get_taf(station: &String) -> Result<GetTafResponse, GetTafError> {
  let response = taf::call_external_api(station).await.map_err(|e| match e {
    taf::CallExternalAPIError::InvalidStation => GetTafError::InvalidStation,
    taf::CallExternalAPIError::UnknownError => GetTafError::UnknownError,
  })?;

  Ok(GetTafResponse {
    airport: station.to_uppercase(),
    taf: response.sanitized,
  })
}
