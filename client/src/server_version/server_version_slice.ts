import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../constants/api";
import { VersionAPIResponse, VersionState } from "./interface";

let initialState: VersionState = {
  server: {
    status: "IDLE",
  },
};

export const get_server_version = createAsyncThunk(
  "version/get_server_version",
  async (): Promise<VersionAPIResponse> => {
    const response = await fetch(`${API_URL}/version`);

    const version = await response.text();

    return {
      status: "SUCCEEDED",
      version,
      last_updated: Date.now(),
    };
  }
);

export const version_slice = createSlice({
  name: "version",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get_server_version.fulfilled, (state, action) => {
      state.server = action.payload;
    });
  },
});

export const { reducer } = version_slice;
