/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { select_theme_object } from "../../../theme/selectors/select_theme_object";
import { get_server_version } from "../../../server_version/server_version_slice";
import { select_server_version } from "../../../server_version/selectors/select_server_version";

import { Footer } from "../components/footer";

export const FooterContainer: FC = () => {
  const theme_object = useAppSelector(select_theme_object);
  const dispatch = useAppDispatch();
  const client_version_string = process.env.REACT_APP_GIT_SHA || "development";

  const server_version = useAppSelector(select_server_version);
  const current_date = Date.now();
  const ms_to_hour = 1000 * 60 * 60;
  if (
    server_version.status === "IDLE" ||
    (server_version.last_updated &&
      current_date - server_version.last_updated >= ms_to_hour)
  ) {
    dispatch(get_server_version());
  }

  let server_version_string;
  if (server_version.status === "SUCCEEDED") {
    server_version_string = server_version.version;
  }

  return (
    <Footer
      theme_object={theme_object}
      client_version={client_version_string}
      server_version={server_version_string}
    />
  );
};
