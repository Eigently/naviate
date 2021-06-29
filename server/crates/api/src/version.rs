use actix_web::get;
use actix_web::HttpResponse;
use actix_web::Responder;

#[get("/version")]
async fn version() -> impl Responder {
  match std::env::var("COMMIT_SHA") {
    Ok(sha) => HttpResponse::Ok().body(sha),
    Err(_) => HttpResponse::Ok().body("development"),
  }
}
