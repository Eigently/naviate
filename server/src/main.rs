use actix_cors::Cors;
use actix_web::{get, middleware::Logger, App, HttpResponse, HttpServer, Responder};
extern crate env_logger;

mod d_atis;

#[get("/health")]
async fn health() -> impl Responder {
    HttpResponse::Ok().finish()
}

#[get("/version")]
async fn version() -> impl Responder {
    match std::env::var("COMMIT_SHA") {
        Ok(sha) => HttpResponse::Ok().body(sha),
        Err(_) => HttpResponse::Ok().body("development"),
    }
}

fn get_cors() -> Cors {
    match std::env::var("RUST_ENV") {
        Ok(x) => match x.as_str() {
            "development" | "dev" => Cors::default()
                .allow_any_origin()
                .allow_any_header()
                .allow_any_method(),
            "production" => Cors::default().allowed_origin("https://www.naviate.xyz"),
            _ => Cors::default(),
        },
        _ => Cors::default(),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init();

    HttpServer::new(|| {
        App::new()
            .wrap(Logger::default())
            .wrap(get_cors())
            .service(health)
            .service(version)
            .configure(d_atis::routes::config)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}
