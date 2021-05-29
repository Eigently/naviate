import { FC } from "react";
import { AspectRatio, chakra, Flex, useColorModeValue } from "@chakra-ui/react";

import { Circle } from "@visx/shape";
import { E6BData } from "../interface";
import { E6BIllustrationArrow } from "./e6b_illustration_arrow";
import { E6BIllustrationCompass } from "./e6b_illustration_compass";
import { E6BIllustrationLabels } from "./e6b_illustration_labels";

const ChakraCircle = chakra(Circle);

type IllustrationProps = {
  correctionData: E6BData;
};

export const E6BIllustration: FC<IllustrationProps> = ({ correctionData }) => {
  const {
    windDirection,
    windSpeed,
    course,
    trueAirspeed,
    heading,
    groundSpeed,
  } = correctionData;

  const windColor = useColorModeValue("orange.500", "orange.300");
  const courseColor = useColorModeValue("red.600", "red.300");
  const headingColor = useColorModeValue("blue.600", "blue.300");
  const faintColor = useColorModeValue("gray.50", "gray.700");
  const circleBackgroundColor = useColorModeValue("white", "gray.800");

  const normalizeLength = (length: number) =>
    (length / Math.max(windSpeed, trueAirspeed, groundSpeed, 1)) * 20;

  const convertToRadians = (aviation_degrees: number) => {
    const res = (((-aviation_degrees + 450) % 360) / 180) * Math.PI;
    return res;
  };

  const CourseArrow: React.FC = () => {
    const courseDirectionRadians = convertToRadians(course);
    const length = normalizeLength(groundSpeed);
    return (
      <E6BIllustrationArrow
        id="course"
        length={length}
        color={courseColor}
        from={{ x: 50, y: 50 }}
        to={{
          x: 50 + length * Math.cos(courseDirectionRadians),
          y: 50 - length * Math.sin(courseDirectionRadians),
        }}
      />
    );
  };

  const HeadingArrow: React.FC = () => {
    const headingRadians = convertToRadians(heading);
    const length = normalizeLength(trueAirspeed);
    return (
      <E6BIllustrationArrow
        id="heading"
        length={length}
        color={headingColor}
        from={{ x: 50, y: 50 }}
        to={{
          x: 50 + length * Math.cos(headingRadians),
          y: 50 - length * Math.sin(headingRadians),
        }}
      />
    );
  };

  const WindArrow: React.FC = () => {
    const windDirectionRadians = convertToRadians(windDirection);
    const length = normalizeLength(windSpeed);

    return (
      <E6BIllustrationArrow
        id="wind"
        length={length}
        color={windColor}
        from={{
          x: 50 + 40 * Math.cos(windDirectionRadians),
          y: 50 - 40 * Math.sin(windDirectionRadians),
        }}
        to={{
          x: 50 + (40 - length) * Math.cos(windDirectionRadians),
          y: 50 - (40 - length) * Math.sin(windDirectionRadians),
        }}
      />
    );
  };

  return (
    <Flex
      gridColumn={{ base: "span 1 / span 1", md: "span 2 / span 2" }}
      p={4}
      justifyContent="center"
      alignItems="stretch"
    >
      <AspectRatio ratio={1} maxWidth="500px" flexGrow={1}>
        <svg viewBox="0 0 100 100">
          <E6BIllustrationCompass />
          <g>
            <WindArrow />
            <CourseArrow />
            <HeadingArrow />
          </g>
          <g>
            <ChakraCircle
              cx={50}
              cy={50}
              r={1}
              fill={faintColor}
              stroke={faintColor}
            />
            <ChakraCircle
              cx={50}
              cy={50}
              r={40}
              stroke={faintColor}
              fill="none"
            />
          </g>
          <E6BIllustrationLabels correctionData={correctionData} />
        </svg>
      </AspectRatio>
    </Flex>
  );
};
