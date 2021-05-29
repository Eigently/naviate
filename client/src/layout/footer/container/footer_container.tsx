/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";

import { getServerVersion } from "../../../server_version/server_version_slice";
import { selectServerVersion } from "../../../server_version/selectors/select_server_version";

import { Footer } from "../components/footer";

export const FooterContainer: FC = () => {
  const dispatch = useAppDispatch();
  const clientVersionString = process.env.REACT_APP_GIT_SHA || "development";

  const serverVersion = useAppSelector(selectServerVersion);
  const currentDate = Date.now();
  const msToHour = 1000 * 60 * 60;
  if (
    serverVersion.status === "IDLE" ||
    (serverVersion.lastUpdated &&
      currentDate - serverVersion.lastUpdated >= msToHour)
  ) {
    dispatch(getServerVersion());
  }

  let serverVersionString;
  if (serverVersion.status === "SUCCEEDED") {
    serverVersionString = serverVersion.version;
  }

  return (
    <Footer
      clientVersion={clientVersionString}
      serverVersion={serverVersionString}
    />
  );
};
