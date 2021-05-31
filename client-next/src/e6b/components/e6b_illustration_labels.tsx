import { useColorModeValue } from "@chakra-ui/react";
import { E6BData } from "../interface";
import { E6BIllustrationLabel } from "./e6b_illustration_label";

type IllustrationLabelsProps = {
  correctionData: E6BData;
};

export const E6BIllustrationLabels: React.FC<IllustrationLabelsProps> = ({
  correctionData: {
    course,
    groundSpeed,
    heading,
    trueAirspeed,
    windCorrectionAngle,
    windDirection,
    windSpeed,
  },
}) => {
  const windColor = useColorModeValue("orange.500", "orange.300");
  const courseColor = useColorModeValue("red.600", "red.300");
  const headingColor = useColorModeValue("blue.600", "blue.300");

  return (
    <g>
      <E6BIllustrationLabel
        x={2}
        y={4}
        color={windColor}
        label={`Wind: ${windDirection} @ ${windSpeed}`}
      />
      <E6BIllustrationLabel
        x={2}
        y={9}
        label={`WCA: ${windCorrectionAngle <= 0 ? "" : "+"}${Math.round(
          windCorrectionAngle
        )}°`}
      />
      <E6BIllustrationLabel
        x={66}
        y={4}
        color={courseColor}
        label={`Course: ${course}°`}
      />
      <E6BIllustrationLabel
        x={66}
        y={9}
        color={headingColor}
        label={`Heading: ${Math.round(heading)}°`}
      />
      <E6BIllustrationLabel
        x={2}
        y={88}
        color={courseColor}
        label={`GS: ${Math.round(groundSpeed)}`}
      />
      <E6BIllustrationLabel
        x={2}
        y={93}
        color={headingColor}
        label={`TAS: ${trueAirspeed}`}
      />
    </g>
  );
};
