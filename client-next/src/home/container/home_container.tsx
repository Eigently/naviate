import { FC } from "react";

import { Home } from "../components/home";
import { PageContainer } from "../../layout/page/container/page_container";

export const HomeContainer: FC = ({ children }) => {
  return <Home PageContainer={PageContainer}>{children}</Home>;
};

export default HomeContainer;
