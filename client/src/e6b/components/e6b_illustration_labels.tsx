/** @jsxImportSource @emotion/react */
import * as t from "io-ts";

import { ThemeObject } from "../../theme/interface";
import { E6BData } from "../interface";
import { E6BIllustrationLabel } from "./e6b_illustration_label";

type IllustrationLabelsProps = {
  theme_object: t.TypeOf<typeof ThemeObject>;
  correction_data: t.TypeOf<typeof E6BData>;
};

export const E6BIllustrationLabels: React.FC<IllustrationLabelsProps> = ({
  theme_object,
  correction_data: {
    course,
    ground_speed,
    heading,
    true_airspeed,
    wind_correction_angle,
    wind_direction,
    wind_speed,
  },
}) => {
  return (
    <g>
      <E6BIllustrationLabel
        x={2}
        y={2}
        color={theme_object.colors.naviate_orange}
        theme_object={theme_object}
        label={`Wind: ${wind_direction} @ ${wind_speed}`}
      />
      <E6BIllustrationLabel
        x={2}
        y={7}
        theme_object={theme_object}
        label={`WCA: ${wind_correction_angle <= 0 ? "" : "+"}${Math.round(
          wind_correction_angle
        )}°`}
      />
      <E6BIllustrationLabel
        x={70}
        y={2}
        color={theme_object.colors.naviate_red}
        theme_object={theme_object}
        label={`Course: ${course}°`}
      />
      <E6BIllustrationLabel
        x={70}
        y={7}
        color={theme_object.colors.naviate_dark_blue}
        theme_object={theme_object}
        label={`Heading: ${Math.round(heading)}°`}
      />
      <E6BIllustrationLabel
        x={2}
        y={90}
        color={theme_object.colors.naviate_red}
        theme_object={theme_object}
        label={`GS: ${Math.round(ground_speed)}`}
      />
      <E6BIllustrationLabel
        x={2}
        y={95}
        color={theme_object.colors.naviate_dark_blue}
        theme_object={theme_object}
        label={`TAS: ${true_airspeed}`}
      />
    </g>
  );
};
