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

type CalculateE6BPayload = {
  course: number;
  trueAirspeed: number;
  windDirection: number;
  windSpeed: number;
};

export const calculate_e6b = createAsyncThunk(
  "e6b/calculate",
  async ({
    course,
    trueAirspeed,
    windDirection,
    windSpeed,
  }: CalculateE6BPayload): Promise<E6BData> => {
    const e6bBackend = await import("naviate-e6b");

    const correction = e6bBackend.get_correction(
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
    };
  }
);

export const e6bSlice = createSlice({
  name: "e6b",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(calculate_e6b.fulfilled, (state, action) => {
      Object.assign(state, action.payload);
    });
  },
});

export const { reducer } = e6bSlice;
