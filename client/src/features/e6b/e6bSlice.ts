import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { E6BData } from "./interface";

export const initialState: E6BData = {
  course: 320,
  trueAirspeed: 100,
  windDirection: 90,
  windSpeed: 23,
  heading: 330,
  groundSpeed: 113,
  windCorrectionAngle: 10,
};

type calculateE6BPayload = {
  course: number;
  trueAirspeed: number;
  windDirection: number;
  windSpeed: number;
};

export const calculateE6B = createAsyncThunk(
  "e6b/calculate",
  async ({
    course,
    trueAirspeed,
    windDirection,
    windSpeed,
  }: calculateE6BPayload): Promise<E6BData> => {
    const E6BBackend = await import("naviate-e6b");

    console.log("Payload: ", course, trueAirspeed, windDirection, windSpeed);
    const correction = E6BBackend.get_correction(
      course,
      trueAirspeed,
      windDirection,
      windSpeed
    );

    const { heading, groundSpeed, windCorrectionAngle } = correction;
    correction.free();

    return {
      course,
      trueAirspeed,
      windDirection,
      windSpeed,
      heading,
      groundSpeed,
      windCorrectionAngle,
    } as E6BData;
  }
);

export const e6bSlice = createSlice({
  name: "e6b",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(calculateE6B.fulfilled, (state, action) => {
      if (action.payload !== undefined) {
        state.course = action.payload.course;
        state.groundSpeed = action.payload.groundSpeed;
        state.heading = action.payload.heading;
        state.trueAirspeed = action.payload.trueAirspeed;
        state.windDirection = action.payload.windDirection;
        state.windSpeed = action.payload.windSpeed;
        state.windCorrectionAngle = action.payload.windCorrectionAngle;
      }
    });
  },
});

export const { reducer } = e6bSlice;
