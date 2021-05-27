/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { useAppSelector } from "../../../app/hooks";
import { selectThemeObject } from "../../theme/selectors/selectThemeObject";

import { Page } from "../components/Page";

import { HeaderContainer } from "../../header/HeaderContainer";
import { Footer } from "../../footer/Footer";

export const PageContainer: FC = () => {
  const themeObject = useAppSelector(selectThemeObject);

  return (
    <Page
      themeObject={themeObject}
      HeaderContainer={<HeaderContainer />}
      FooterContainer={<Footer themeObject={themeObject} />}
    />
  );
};
