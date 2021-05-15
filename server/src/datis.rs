use actix_web::{
    get,
    http::StatusCode,
    web::{Path, ServiceConfig},
    HttpResponse, ResponseError,
};
use serde::{Deserialize, Serialize};
use thiserror::Error;

#[derive(Error, Debug)]
enum HandleDatisError {
    #[error("Unknown Interal Error.")]
    UnknownError,
    #[error("Invalid or Unsupported ICAO Code.")]
    InvalidICAOCode,
}

impl HandleDatisError {
    pub fn name(&self) -> String {
        match self {
            Self::InvalidICAOCode => "InvalidICAOCode".to_string(),
            Self::UnknownError => "UnknownError".to_string(),
        }
    }
}

impl ResponseError for HandleDatisError {
    fn status_code(&self) -> StatusCode {
        match *self {
            Self::UnknownError => StatusCode::INTERNAL_SERVER_ERROR,
            Self::InvalidICAOCode => StatusCode::BAD_REQUEST,
        }
    }

    fn error_response(&self) -> HttpResponse {
        let status_code = self.status_code();
        let error_response = ErrorResponse {
            code: status_code.as_u16(),
            message: self.to_string(),
            error: self.name(),
        };
        HttpResponse::build(status_code).json(error_response)
    }
}

#[derive(Serialize)]
struct ErrorResponse {
    code: u16,
    error: String,
    message: String,
}

#[derive(Deserialize)]
struct ClowdResponse {
    airport: String,
    datis: String,
    r#type: String,
}

#[derive(Serialize, Default)]
struct HandleDatisResponse {
    airport: String,
    datis_type: String,
    datis_combined: Option<String>,
    datis_departure: Option<String>,
    datis_arrival: Option<String>,
}

#[get("/datis/{icao_code}")]
async fn handle_datis(Path(icao_code): Path<String>) -> Result<HttpResponse, HandleDatisError> {
    let api_call_response =
        reqwest::blocking::get(format!("https://datis.clowd.io/api/{}", icao_code))
            .map_err(|_| HandleDatisError::UnknownError)?;

    let airport_data_array = api_call_response
        .json::<Vec<ClowdResponse>>()
        .map_err(|_| HandleDatisError::InvalidICAOCode)?;

    let airport_data = airport_data_array
        .get(0)
        .ok_or(HandleDatisError::UnknownError)?;

    if airport_data.r#type == "combined" {
        return Ok(HttpResponse::Ok().json(HandleDatisResponse {
            airport: airport_data.airport.to_owned(),
            datis_type: "COMBINED".to_string(),
            datis_combined: Some(airport_data.datis.to_owned()),
            ..Default::default()
        }));
    }

    let (mut datis_arrival, mut datis_departure) = (None, None);

    for airport_data in &airport_data_array {
        if airport_data.r#type.as_str() == "arr" {
            datis_arrival = Some(airport_data.datis.clone());
        } else {
            datis_departure = Some(airport_data.datis.clone());
        }
    }

    Ok(HttpResponse::Ok().json(HandleDatisResponse {
        airport: airport_data.airport.to_owned(),
        datis_type: "SEPARATED".to_string(),
        datis_arrival,
        datis_departure,
        ..Default::default()
    }))
}

pub fn config(cfg: &mut ServiceConfig) {
    cfg.service(handle_datis);
}
