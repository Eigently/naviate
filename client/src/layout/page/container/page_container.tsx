/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { useAppSelector } from "../../../state/hooks";
import { select_theme_object } from "../../../theme/selectors/select_theme_object";

import { Page } from "../components/page";

import { HeaderContainer } from "../../header/container/header_container";
import { FooterContainer } from "../../footer/container/footer_container";

export const PageContainer: FC = ({ children }) => {
  const theme_object = useAppSelector(select_theme_object);

  return (
    <Page
      theme_object={theme_object}
      HeaderContainer={<HeaderContainer />}
      FooterContainer={<FooterContainer />}
    >
      {children}
    </Page>
  );
};
