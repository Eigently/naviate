pub fn to_radians(degrees: f64) -> f64 {
    degrees / 180.0 * std::f64::consts::PI
}

pub fn to_degrees(radians: f64) -> f64 {
    radians / std::f64::consts::PI * 180.0
}
