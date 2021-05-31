import { FC } from "react";

import { Page } from "../components/page";

import { HeaderContainer } from "../../header/container/header_container";
import { FooterContainer } from "../../footer/container/footer_container";

export const PageContainer: FC = ({ children }) => {
  return (
    <Page
      HeaderContainer={<HeaderContainer />}
      FooterContainer={<FooterContainer />}
    >
      {children}
    </Page>
  );
};
