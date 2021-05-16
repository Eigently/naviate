import { RootState } from "../../../app/store";

export const selectServerVersion = (state: RootState) => state.version.server;
