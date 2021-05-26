import { RootState } from "../../state/store";
import { E6BData } from "../interface";

export const select_e6b_data = (state: RootState): E6BData => state.e6b;
