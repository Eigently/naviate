export interface DAtisData {
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
  data?: {
    icaoCode: string;
    dAtisType: "COMBINED" | "SEPARATED";
    dAtisCombined?: string;
    dAtisDeparture?: string;
    dAtisArrival?: string;
  };
}
