use wasm_bindgen::prelude::*;

use crate::math_utils;

#[wasm_bindgen]
#[derive(Debug)]
pub struct CorrectionData {
    pub wind_correction_angle: f64,
    pub ground_speed: f64,
    pub heading: f64,
}

fn get_wind_correction_angle(
    wind_speed: f64,
    wind_direction: f64,
    desired_course: f64,
    true_airspeed: f64,
) -> f64 {
    ((wind_speed * (wind_direction - desired_course).sin()) / true_airspeed).asin()
}

fn get_true_groundspeed(
    true_airspeed: f64,
    wind_speed: f64,
    wind_direction: f64,
    course: f64,
    wind_correction_angle: f64,
) -> f64 {
    dbg!(
        true_airspeed,
        wind_speed,
        wind_direction,
        course,
        wind_correction_angle
    );
    (true_airspeed.powi(2) + wind_speed.powi(2)
        - 2.0
            * true_airspeed
            * wind_speed
            * (course - wind_direction + wind_correction_angle).cos())
    .sqrt()
}

#[wasm_bindgen]
pub fn get_correction(
    course_degrees: f64,
    true_airspeed: f64,
    wind_direction_degrees: f64,
    wind_speed: f64,
) -> CorrectionData {
    let course = math_utils::to_radians(course_degrees);
    let wind_direction = math_utils::to_radians(wind_direction_degrees);

    let wind_correction_angle =
        get_wind_correction_angle(wind_speed, wind_direction, course, true_airspeed);
    let ground_speed = get_true_groundspeed(
        true_airspeed,
        wind_speed,
        wind_direction,
        course,
        wind_correction_angle,
    );

    let heading = math_utils::to_degrees(wind_correction_angle + course);
    let wind_correction_angle = math_utils::to_degrees(wind_correction_angle);

    CorrectionData {
        wind_correction_angle,
        ground_speed,
        heading,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn correction_test() {
        let res = get_correction(180.0, 100.0, 90.0, 43.0);
        assert!((res.wind_correction_angle - -25.0).abs() < 1.0);
        assert!((res.wind_correction_angle - -25.0).abs() < 1.0);
    }
}
