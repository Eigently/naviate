use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Debug, Serialize, Default)]
pub struct GetDAtisResponse {
    airport: String,
    d_atis_type: String,
    d_atis_combined: Option<String>,
    d_atis_departure: Option<String>,
    d_atis_arrival: Option<String>,
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

#[derive(Deserialize)]
struct ExternalAPIResponse {
    datis: String,
    r#type: String,
}

#[derive(Deserialize)]
struct ExternalAPIError {
    #[allow(dead_code)]
    error: String,
}

pub async fn get_d_atis(icao_code: &String) -> Result<GetDAtisResponse, GetDAtisError> {
    let api_call_response =
        reqwest::blocking::get(format!("https://datis.clowd.io/api/{}", icao_code))
            .map_err(|_| GetDAtisError::UnknownError)?
            .bytes()
            .map_err(|_| GetDAtisError::UnknownError)?;

    if serde_json::from_slice::<ExternalAPIError>(&api_call_response).is_ok() {
        return Err(GetDAtisError::InvalidICAOCode);
    }

    let airport_data_array = serde_json::from_slice::<Vec<ExternalAPIResponse>>(&api_call_response)
        .map_err(|_| GetDAtisError::UnknownError)?;

    let airport_data = airport_data_array
        .get(0)
        .ok_or_else(|| GetDAtisError::DAtisAPIError)?;

    if airport_data.r#type == "combined" {
        return Ok(GetDAtisResponse {
            airport: icao_code.to_uppercase(),
            d_atis_type: "COMBINED".into(),
            d_atis_combined: Some(airport_data.datis.clone()),
            ..Default::default()
        });
    }

    let mut d_atis_arrival = None;
    let mut d_atis_departure = None;

    airport_data_array.into_iter().for_each(|airport_data| {
        match airport_data.r#type.as_str() {
            "dep" => d_atis_arrival = Some(airport_data.datis.clone()),
            "arr" => d_atis_departure = Some(airport_data.datis.clone()),
            _ => {}
        };
    });

    Ok(GetDAtisResponse {
        airport: icao_code.to_uppercase(),
        d_atis_type: "SEPARATED".into(),
        d_atis_arrival,
        d_atis_departure,
        ..Default::default()
    })
}
