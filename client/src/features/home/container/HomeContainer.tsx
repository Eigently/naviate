/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { useAppSelector } from "../../../app/hooks";
import { selectThemeObject } from "../../theme/selectors/selectThemeObject";

import { Home } from "../components/Home";

import { PageContainer } from "../../page/container/PageContainer";

export const HomeContainer: FC = ({ children }) => {
  const themeObject = useAppSelector(selectThemeObject);

  return (
    <Home themeObject={themeObject} PageContainer={PageContainer}>
      {children}
    </Home>
  );
};

export default HomeContainer;
