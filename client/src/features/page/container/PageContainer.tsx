/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { useAppSelector } from "../../../app/hooks";
import { selectThemeObject } from "../../theme/selectors/selectThemeObject";

import { Page } from "../components/Page";

import { HeaderContainer } from "../../header/HeaderContainer";
import { FooterContainer } from "../../footer/container/FooterContainer";

export const PageContainer: FC = ({ children }) => {
  const themeObject = useAppSelector(selectThemeObject);

  return (
    <Page
      themeObject={themeObject}
      HeaderContainer={<HeaderContainer />}
      FooterContainer={<FooterContainer />}
    >
      {children}
    </Page>
  );
};
