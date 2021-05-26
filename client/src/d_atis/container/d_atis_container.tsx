/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { DAtis } from "../components/d_atis";

import { useAppSelector } from "../../state/hooks";
import { select_theme_object } from "../../theme/selectors/select_theme_object";

export const DAtisContainer: FC = () => {
  const theme_object = useAppSelector(select_theme_object);
  return <DAtis theme_object={theme_object} />;
};
