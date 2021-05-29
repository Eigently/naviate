import { RootState } from "../../state/store";
import { E6BData } from "../interface";

export const selectE6BData = (state: RootState): E6BData => state.e6b;
