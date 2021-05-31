import { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../state/hooks";

import { E6B } from "../components/e6b";

import { calculate_e6b } from "../e6b_slice";
import { selectE6BData } from "../selectors/select_e6b_data";

export const E6BContainer: FC = () => {
  const dispatch = useAppDispatch();
  const e6bData = useAppSelector(selectE6BData);

  const handleFormInput = (
    course: number,
    trueAirspeed: number,
    windDirection: number,
    windSpeed: number
  ) => {
    dispatch(
      calculate_e6b({
        course,
        trueAirspeed,
        windDirection,
        windSpeed,
      })
    );
  };

  return <E6B correctionData={e6bData} handleFormInput={handleFormInput} />;
};
