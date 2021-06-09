import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DAtisData } from "./interface";
import { API_URL } from "../constants/api";

export const initialState: DAtisData = {
  status: "idle",
};

type GetDAtisPayload = {
  icaoCode: string;
};

export const getDAtis = createAsyncThunk(
  "d_atis/get",
  async ({ icaoCode }: GetDAtisPayload): Promise<DAtisData> => {
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
        icaoCode: result.airport,
        dAtisType: result.d_atis_type,
        dAtisCombined: result.d_atis_combined,
        dAtisDeparture: result.d_atis_departure,
        dAtisArrival: result.d_atis_arrival,
      },
    };
  }
);

export const e6bSlice = createSlice({
  name: "e6b",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDAtis.fulfilled, (_state, action) => {
        return action.payload;
      })
      .addCase(getDAtis.pending, (_state, _action) => {
        return { status: "loading" };
      });
  },
});

export const { reducer } = e6bSlice;
