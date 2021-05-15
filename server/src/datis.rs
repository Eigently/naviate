use actix_web::{
    get,
    http::StatusCode,
    web::{Path, ServiceConfig},
    HttpResponse, ResponseError,
};
use serde::Serialize;
use thiserror::Error;

#[derive(Error, Debug)]
enum HandleDatisError {
    #[error("Unknown Interal Error.")]
    UnknownError,
    #[error("Invalid ICAO Code.")]
    #[allow(dead_code)]
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

#[get("/{icao_code}")]
async fn handle_datis(Path(icao_code): Path<String>) -> Result<HttpResponse, HandleDatisError> {
    let clowd_call = reqwest::blocking::get(format!("https://datis.clowd.io/api/{}", icao_code))
        .map_err(|_| HandleDatisError::UnknownError)?
        .text()
        .map_err(|_| HandleDatisError::UnknownError)?;
    Ok(HttpResponse::Ok().body(clowd_call))
}

pub fn config(cfg: &mut ServiceConfig) {
    cfg.service(handle_datis);
}
