import * as t from "io-ts";

export interface DAtisData {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  data?: {
    icao_code: string;
    d_atis_type: "COMBINED" | "SEPARATED";
    d_atis_combined?: string;
    d_atis_departure?: string;
    d_atis_arrival?: string;
  };
}
