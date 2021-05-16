/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectThemeObject } from "../../theme/selectors/selectThemeObject";
import { selectServerVersion } from "../../version/selectors/selectServerVersion";
import { getServerVersion } from "../../version/versionSlice";

import { Footer } from "../components/Footer";

export const FooterContainer: FC = () => {
  const themeObject = useAppSelector(selectThemeObject);
  const dispatch = useAppDispatch();
  const clientVersionString = process.env.REACT_APP_GIT_SHA || "dev";

  const serverVersion = useAppSelector(selectServerVersion);
  if (serverVersion.status === "IDLE") {
    dispatch(getServerVersion());
  }

  let serverVersionString;
  if (serverVersion.status === "SUCCEEDED") {
    serverVersionString = serverVersion.version;
  }

  return (
    <Footer
      themeObject={themeObject}
      clientVersion={clientVersionString}
      serverVersion={serverVersionString}
    />
  );
};
