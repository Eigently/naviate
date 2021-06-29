use actix_web::get;
use actix_web::middleware::Logger;
use actix_web::App;
use actix_web::HttpResponse;
use actix_web::HttpServer;
use actix_web::Responder;
use env_logger;

mod cors;
mod routes;
mod version;

#[get("/health")]
async fn health() -> impl Responder {
  HttpResponse::Ok().finish()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
  env_logger::init();

  HttpServer::new(|| {
    App::new()
      .wrap(cors::get_cors())
      .wrap(Logger::default())
      .service(health)
      .service(version::version)
      .configure(routes::d_atis::config)
      .configure(routes::metar::config)
      .configure(routes::taf::config)
  })
  .bind("0.0.0.0:8080")?
  .run()
  .await
}
