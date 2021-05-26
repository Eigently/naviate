/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { DAtis } from "../components/d_atis";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { select_theme_object } from "../../theme/selectors/select_theme_object";
import { get_d_atis } from "../d_atis_slice";
import { select_d_atis_data } from "../selectors/select_d_atis_data";

export const DAtisContainer: FC = () => {
  const dispatch = useAppDispatch();

  const theme_object = useAppSelector(select_theme_object);
  const d_atis_data = useAppSelector(select_d_atis_data);
  const handle_get_d_atis = (icao_code: string) =>
    dispatch(get_d_atis({ icao_code }));

  return (
    <DAtis
      theme_object={theme_object}
      d_atis_data={d_atis_data}
      handle_get_d_atis={handle_get_d_atis}
    />
  );
};
