import { RootState } from "../../state/store";

export const select_server_version = (state: RootState) =>
  state.server_version.server;
