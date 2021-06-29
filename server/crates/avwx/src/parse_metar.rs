use serde::Serialize;
use thiserror::Error;

use crate::metar;

#[derive(Debug, Serialize, Default)]
pub struct GetMetarResponse {
  pub airport: String,
  pub metar: String,
}

#[derive(Error, Debug)]
pub enum GetMetarError {
  #[error("Invalid Station")]
  InvalidStation,

  #[error("Unknown Error")]
  UnknownError,
}

pub async fn get_metar(station: &String) -> Result<GetMetarResponse, GetMetarError> {
  let response = metar::call_external_api(station)
    .await
    .map_err(|e| match e {
      metar::CallExternalAPIError::InvalidStation => GetMetarError::InvalidStation,
      metar::CallExternalAPIError::UnknownError => GetMetarError::UnknownError,
    })?;

  Ok(GetMetarResponse {
    airport: station.to_uppercase(),
    metar: response.sanitized,
  })
}
