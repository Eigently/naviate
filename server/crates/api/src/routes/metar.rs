use actix_web::get;
use actix_web::http::StatusCode;
use actix_web::web::Path;
use actix_web::web::ServiceConfig;
use actix_web::HttpResponse;
use actix_web::ResponseError;
use serde::Serialize;
use thiserror::Error;

use naviate_avwx;

#[derive(Serialize)]
struct ErrorResponse {
  code: u16,
  error: String,
  message: String,
}

#[derive(Error, Debug)]
enum HandleMetarError {
  #[error("Internal Server Error.")]
  InternalServerError,
  #[error("Invalid or Unsupported Station.")]
  InvalidStation,
}

impl HandleMetarError {
  fn status_code(&self) -> StatusCode {
    match *self {
      Self::InternalServerError => StatusCode::INTERNAL_SERVER_ERROR,
      Self::InvalidStation => StatusCode::BAD_REQUEST,
    }
  }
}

impl ResponseError for HandleMetarError {
  fn error_response(&self) -> HttpResponse {
    let status_code = self.status_code();
    let error_response = ErrorResponse {
      code: status_code.as_u16(),
      error: format!("{:?}", self),
      message: self.to_string(),
    };
    HttpResponse::build(status_code).json(error_response)
  }
}

#[get("/avwx/metar/{station}")]
async fn handle_metar(path: Path<String>) -> Result<HttpResponse, HandleMetarError> {
  let station = path.into_inner();
  let response = naviate_avwx::get_metar(&station).await;

  match response {
    Err(e) => match e {
      naviate_avwx::GetMetarError::UnknownError => Err(HandleMetarError::InternalServerError),
      naviate_avwx::GetMetarError::InvalidStation => Err(HandleMetarError::InvalidStation),
    },
    Ok(r) => Ok(HttpResponse::Ok().json(r)),
  }
}

pub fn config(cfg: &mut ServiceConfig) {
  cfg.service(handle_metar);
}
