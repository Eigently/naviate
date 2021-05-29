import { RootState } from "../../state/store";

export const selectServerVersion = (state: RootState) =>
  state.serverVersion.server;
