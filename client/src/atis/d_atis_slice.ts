import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DAtisState } from "./interface";
import { API_URL } from "../constants/api";

export const initialState: DAtisState = {
  status: "idle",
};

type GetDAtisPayload = {
  icaoCode: string;
};

export const getDAtis = createAsyncThunk(
  "dAtis/get",
  async ({ icaoCode }: GetDAtisPayload): Promise<DAtisState> => {
    const result: any = await fetch(`${API_URL}/d_atis/${icaoCode}`).then(
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
        airport: result.airport,
        data: result.data,
      },
    };
  }
);

export const dAtisSlice = createSlice({
  name: "dAtis",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDAtis.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(getDAtis.pending, (_state, _action) => {
        return { status: "loading" };
      })
      .addCase(getDAtis.rejected, (_state, _action) => {
        return { status: "failed", error: "Unknown error." };
      });
  },
});

export const { reducer } = dAtisSlice;
