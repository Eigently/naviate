use actix_web::{get, middleware::Logger, App, HttpResponse, HttpServer, Responder};
extern crate env_logger;

mod datis;

#[get("/health")]
async fn health() -> impl Responder {
    HttpResponse::Ok().finish()
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .service(health)
            .configure(datis::routes::config)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
