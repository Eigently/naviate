use actix_web::get;
use actix_web::http::StatusCode;
use actix_web::web::Path;
use actix_web::web::ServiceConfig;
use actix_web::HttpResponse;
use actix_web::ResponseError;
use serde::Serialize;
use thiserror::Error;

use naviate_d_atis;

#[derive(Serialize)]
struct ErrorResponse {
  code: u16,
  error: String,
  message: String,
}

#[derive(Error, Debug)]
enum HandleDatisError {
  #[error("Internal Server Error.")]
  InternalServerError,
  #[error("Invalid or Unsupported ICAO Code.")]
  InvalidICAOCode,
}

impl HandleDatisError {
  pub fn name(&self) -> String {
    match self {
      Self::InvalidICAOCode => "InvalidICAOCode".to_string(),
      Self::InternalServerError => "InternalServerError".to_string(),
    }
  }
}

impl ResponseError for HandleDatisError {
  fn status_code(&self) -> StatusCode {
    match *self {
      Self::InternalServerError => StatusCode::INTERNAL_SERVER_ERROR,
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

#[get("/d_atis/{icao_code}")]
async fn handle_datis(Path(icao_code): Path<String>) -> Result<HttpResponse, HandleDatisError> {
  let response = naviate_d_atis::get_d_atis(&icao_code).await;

  match response {
    Err(e) => match e {
      naviate_d_atis::GetDAtisError::DAtisAPIError
      | naviate_d_atis::GetDAtisError::UnknownError => Err(HandleDatisError::InternalServerError),
      naviate_d_atis::GetDAtisError::InvalidICAOCode => Err(HandleDatisError::InvalidICAOCode),
    },
    Ok(r) => Ok(HttpResponse::Ok().json(r)),
  }
}

pub fn config(cfg: &mut ServiceConfig) {
  cfg.service(handle_datis);
}
