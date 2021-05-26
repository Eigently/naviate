/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { DAtis } from "../components/DAtis";

import { useAppSelector } from "../../../app/hooks";
import { selectThemeObject } from "../../theme/selectors/selectThemeObject";

export const DAtisContainer: FC = () => {
  const themeObject = useAppSelector(selectThemeObject);

  return <DAtis themeObject={themeObject} />;
};
