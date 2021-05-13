/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { E6B } from "../components/E6B";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectThemeObject } from "../../theme/selectors/selectThemeObject";
import { calculateE6B } from "../e6bSlice";
import { selectE6BData } from "../selectors/selectE6BData";

export const E6BContainer: FC = () => {
  const dispatch = useAppDispatch();

  const e6bData = useAppSelector(selectE6BData);
  const themeObject = useAppSelector(selectThemeObject);

  return (
    <E6B
      themeObject={themeObject}
      correctionData={e6bData}
      handleFormInput={(course, trueAirspeed, windDirection, windSpeed) =>
        dispatch(
          calculateE6B({ course, trueAirspeed, windDirection, windSpeed })
        )
      }
    />
  );
};
