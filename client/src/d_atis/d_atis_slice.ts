import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DAtisData } from "./interface";
import { API_URL } from "../constants/api";

export const initial_state: DAtisData = {
  status: "idle",
};

type GetDAtisPayload = {
  icao_code: string;
};

export const get_d_atis = createAsyncThunk(
  "d_atis/get",
  async ({ icao_code }: GetDAtisPayload): Promise<DAtisData> => {
    const result: any = await fetch(
      `${API_URL}/d_atis/${icao_code}`
    ).then((result) => result.json());

    if (result.error) {
      return {
        status: "failed",
        error: result.message,
      };
    }

    return {
      status: "succeeded",
      data: {
        icao_code: result.airport,
        d_atis_type: result.d_atis_type,
        d_atis_combined: result.d_atis_combined,
        d_atis_departure: result.d_atis_departure,
        d_atis_arrival: result.d_atis_arrival,
      },
    };
  }
);

export const e6b_slice = createSlice({
  name: "e6b",
  initialState: initial_state,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(get_d_atis.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(get_d_atis.pending, (state, action) => {
        return { status: "loading" };
      });
  },
});

export const { reducer } = e6b_slice;
