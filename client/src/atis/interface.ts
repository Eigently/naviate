export type LoadingStatus = "idle" | "loading" | "succeeded" | "failed";

export interface DAtis {
  airport: string;
  data: DAtisCombinedData | DAtisSeparatedData;
}

export interface DAtisCombinedData {
  combined: string;
}

export interface DAtisSeparatedData {
  arrival: string;
  departure: string;
}

export enum DAtisType {
  COMBINED = "combined",
  ARRIVAL = "arrival",
  DEPARTURE = "departure",
}

export interface DAtisState {
  status: LoadingStatus;
  error?: string;
  data?: DAtis;
}

export interface MetarState {
  status: LoadingStatus;
  error?: string;
  data?: {
    station: string;
    metar: string;
  };
}

export interface TafState {
  status: LoadingStatus;
  error?: string;
  data?: {
    station: string;
    taf: string;
  };
}
