/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { DAtis } from "../components/d_atis";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getDAtis as getDAtis } from "../d_atis_slice";
import { select_d_atis_data as selectDAtisData } from "../selectors/select_d_atis_data";

export const DAtisContainer: FC = () => {
  const dispatch = useAppDispatch();

  const dAtisData = useAppSelector(selectDAtisData);
  const handleGetDAtis = (icaoCode: string) =>
    dispatch(getDAtis({ icaoCode: icaoCode }));

  return <DAtis dAtisData={dAtisData} handleGetDAtis={handleGetDAtis} />;
};
