import { RootState } from "../../state/store";

export const selectDAtisData = (state: RootState) => state.dAtis;
export const selectMetarData = (state: RootState) => state.metar;
export const selectTafData = (state: RootState) => state.taf;
