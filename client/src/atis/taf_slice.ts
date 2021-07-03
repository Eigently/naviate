import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TafState } from "./interface";
import { API_URL } from "../constants/api";

export const initialState: TafState = {
  status: "idle",
};

type GetTafPayload = {
  station: string;
};

export const getTaf = createAsyncThunk(
  "taf/get",
  async ({ station }: GetTafPayload): Promise<TafState> => {
    const result: any = await fetch(`${API_URL}/avwx/taf/${station}`).then(
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
        taf: result.taf,
      },
    };
  }
);

export const tafSlice = createSlice({
  name: "taf",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTaf.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(getTaf.pending, (_state, _action) => {
        return { status: "loading" };
      })
      .addCase(getTaf.rejected, (_state, _action) => {
        return { status: "failed", error: "Unknown error." };
      });
  },
});

export const { reducer } = tafSlice;
