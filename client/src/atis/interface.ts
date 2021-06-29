export type LoadingStatus = "idle" | "loading" | "succeeded" | "failed";

export interface DAtisData {
  status: LoadingStatus;
  error?: string;
  data?: {
    icaoCode: string;
    dAtisType: "COMBINED" | "SEPARATED";
    dAtisCombined?: string;
    dAtisDeparture?: string;
    dAtisArrival?: string;
  };
}

export interface MetarData {
  status: LoadingStatus;
  error?: string;
  data?: {
    station: string;
    metar: string;
  };
}

export interface TafData {
  status: LoadingStatus;
  error?: string;
  data?: {
    station: string;
    taf: string;
  };
}
