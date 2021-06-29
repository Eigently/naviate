import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MetarData } from "./interface";
import { API_URL } from "../constants/api";

export const initialState: MetarData = {
  status: "idle",
};

type GetMetarPayload = {
  station: string;
};

export const getMetar = createAsyncThunk(
  "metar/get",
  async ({ station }: GetMetarPayload): Promise<MetarData> => {
    const result: any = await fetch(`${API_URL}/avwx/metar/${station}`).then(
      (result) => result.json()
    );

    if (result.error) {
      return {
        status: "failed",
        error: result.message,
      };
    }

    return {
      status: "succeeded",
      data: {
        station: result.airport,
        metar: result.metar,
      },
    };
  }
);

export const metarSlice = createSlice({
  name: "metar",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMetar.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(getMetar.pending, (_state, _action) => {
        return { status: "loading" };
      })
      .addCase(getMetar.rejected, (_state, _action) => {
        return { status: "failed", error: "Unknown error." };
      });
  },
});

export const { reducer } = metarSlice;
