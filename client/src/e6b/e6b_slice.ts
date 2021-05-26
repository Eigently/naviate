import * as t from "io-ts";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { E6BData } from "./interface";

export const initial_state: t.TypeOf<typeof E6BData> = {
  course: 320,
  true_airspeed: 100,
  wind_direction: 90,
  wind_speed: 23,
  heading: 330,
  ground_speed: 113,
  wind_correction_angle: 10,
};

type CalculateE6BPayload = {
  course: number;
  true_airspeed: number;
  wind_direction: number;
  wind_speed: number;
};

export const calculate_e6b = createAsyncThunk(
  "e6b/calculate",
  async ({
    course,
    true_airspeed,
    wind_direction,
    wind_speed,
  }: CalculateE6BPayload): Promise<t.TypeOf<typeof E6BData>> => {
    const e6b_backend = await import("naviate-e6b");

    const correction = e6b_backend.get_correction(
      course,
      true_airspeed,
      wind_direction,
      wind_speed
    );

    const { heading, ground_speed, wind_correction_angle } = correction;
    correction.free();

    return {
      course,
      true_airspeed,
      wind_direction,
      wind_speed,
      heading,
      ground_speed,
      wind_correction_angle,
    } as t.TypeOf<typeof E6BData>;
  }
);

export const e6b_slice = createSlice({
  name: "e6b",
  initialState: initial_state,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(calculate_e6b.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.course = action.payload.course;
        state.ground_speed = action.payload.ground_speed;
        state.heading = action.payload.heading;
        state.true_airspeed = action.payload.true_airspeed;
        state.wind_direction = action.payload.wind_direction;
        state.wind_speed = action.payload.wind_speed;
        state.wind_correction_angle = action.payload.wind_correction_angle;
      }
    });
  },
});

export const { reducer } = e6b_slice;
