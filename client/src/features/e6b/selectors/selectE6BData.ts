import { RootState } from "../../../app/store";
import { E6BData } from "../interface";

export const selectE6BData = (state: RootState): E6BData => state.e6b;
