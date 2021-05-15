use actix_web::{
    get,
    web::{Path, ServiceConfig},
    HttpResponse, Responder,
};

#[get("/{icao_code}/")]
async fn hello(Path(icao_code): Path<String>) -> impl Responder {
    HttpResponse::Ok().body(format!("Hello {}!", icao_code))
}

pub fn config(cfg: &mut ServiceConfig) {
    cfg.service(hello);
}
