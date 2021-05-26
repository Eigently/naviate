import * as t from "io-ts";

export const E6BData = t.type({
  course: t.number,
  true_airspeed: t.number,
  wind_direction: t.number,
  wind_speed: t.number,
  heading: t.number,
  ground_speed: t.number,
  wind_correction_angle: t.number,
});
