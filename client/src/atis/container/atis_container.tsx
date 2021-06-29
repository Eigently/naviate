import { FC } from "react";

import { Atis } from "../components/atis";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { getDAtis } from "../d_atis_slice";
import {
  selectDAtisData as selectDAtisData,
  selectMetarData,
  selectTafData,
} from "../selectors/select_d_atis_data";
import { getMetar } from "../metar_slice";
import { getTaf } from "../taf_slice";

export const AtisContainer: FC = () => {
  const dispatch = useAppDispatch();

  const dAtisData = useAppSelector(selectDAtisData);
  const metarData = useAppSelector(selectMetarData);
  const tafData = useAppSelector(selectTafData);
  const handleGetDAtis = (icaoCode: string) => dispatch(getDAtis({ icaoCode }));
  const handleGetMetar = (station: string) => dispatch(getMetar({ station }));
  const handleGetTaf = (station: string) => dispatch(getTaf({ station }));

  return (
    <Atis
      dAtisData={dAtisData}
      handleGetDAtis={handleGetDAtis}
      metarData={metarData}
      handleGetMetar={handleGetMetar}
      tafData={tafData}
      handleGetTaf={handleGetTaf}
    />
  );
};
