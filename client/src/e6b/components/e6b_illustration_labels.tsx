import { useColorModeValue } from "@chakra-ui/system";
import * as t from "io-ts";

import { E6BData } from "../interface";
import { E6BIllustrationLabel } from "./e6b_illustration_label";

type IllustrationLabelsProps = {
  correction_data: t.TypeOf<typeof E6BData>;
};

export const E6BIllustrationLabels: React.FC<IllustrationLabelsProps> = ({
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
  const wind_color = useColorModeValue("orange.500", "orange.300");
  const course_color = useColorModeValue("red.600", "red.300");
  const heading_color = useColorModeValue("blue.600", "blue.300");

  return (
    <g>
      <E6BIllustrationLabel
        x={2}
        y={4}
        color={wind_color}
        label={`Wind: ${wind_direction} @ ${wind_speed}`}
      />
      <E6BIllustrationLabel
        x={2}
        y={9}
        label={`WCA: ${wind_correction_angle <= 0 ? "" : "+"}${Math.round(
          wind_correction_angle
        )}°`}
      />
      <E6BIllustrationLabel
        x={66}
        y={4}
        color={course_color}
        label={`Course: ${course}°`}
      />
      <E6BIllustrationLabel
        x={66}
        y={9}
        color={heading_color}
        label={`Heading: ${Math.round(heading)}°`}
      />
      <E6BIllustrationLabel
        x={2}
        y={88}
        color={course_color}
        label={`GS: ${Math.round(ground_speed)}`}
      />
      <E6BIllustrationLabel
        x={2}
        y={93}
        color={heading_color}
        label={`TAS: ${true_airspeed}`}
      />
    </g>
  );
};
