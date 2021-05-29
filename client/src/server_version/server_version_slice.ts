import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../constants/api";
import { VersionAPIResponse, VersionState } from "./interface";

let initialState: VersionState = {
  server: {
    status: "IDLE",
  },
};

export const getServerVersion = createAsyncThunk(
  "version/get_server_version",
  async (): Promise<VersionAPIResponse> => {
    const response = await fetch(`${API_URL}/version`);

    const version = await response.text();

    return {
      status: "SUCCEEDED",
      version,
      lastUpdated: Date.now(),
    };
  }
);

export const versionSlice = createSlice({
  name: "version",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getServerVersion.fulfilled, (state, action) => {
      state.server = action.payload;
    });
  },
});

export const { reducer } = versionSlice;
