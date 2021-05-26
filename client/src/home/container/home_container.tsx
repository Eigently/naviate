/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { Home } from "../components/home";

import { useAppSelector } from "../../state/hooks";

import { PageContainer } from "../../layout/page/container/page_container";

import { select_theme_object } from "../../theme/selectors/select_theme_object";

export const HomeContainer: FC = ({ children }) => {
  const theme_object = useAppSelector(select_theme_object);

  return (
    <Home theme_object={theme_object} PageContainer={PageContainer}>
      {children}
    </Home>
  );
};

export default HomeContainer;
