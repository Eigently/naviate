export type Theme = "Light" | "Dark";

export interface VersionAPIResponse {
  status: "IDLE" | "LOADING" | "SUCCEEDED" | "FAILED";
  error?: string;
  version?: string;
  lastUpdated?: number;
}

export interface VersionState {
  server: VersionAPIResponse;
}
