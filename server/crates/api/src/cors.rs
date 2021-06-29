use actix_cors::Cors;

pub fn get_cors() -> Cors {
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
