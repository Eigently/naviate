/** @jsxImportSource @emotion/react */
import { FC } from "react";

import { E6B } from "../components/e6b";

import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { calculate_e6b } from "../e6b_slice";
import { select_e6b_data } from "../selectors/select_e6b_data";

export const E6BContainer: FC = () => {
  const dispatch = useAppDispatch();

  const e6b_data = useAppSelector(select_e6b_data);

  return (
    <E6B
      correction_data={e6b_data}
      handle_form_input={(course, true_airspeed, wind_direction, wind_speed) =>
        dispatch(
          calculate_e6b({
            course,
            true_airspeed,
            wind_direction,
            wind_speed,
          })
        )
      }
    />
  );
};
