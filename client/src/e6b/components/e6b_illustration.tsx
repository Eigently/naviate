import * as t from "io-ts";
import { FC } from "react";
import { AspectRatio, chakra, Flex, useColorModeValue } from "@chakra-ui/react";

import { Circle } from "@visx/shape";
import { E6BData } from "../interface";
import { E6BIllustrationArrow } from "./e6b_illustration_arrow";
import { E6BIllustrationCompass } from "./e6b_illustration_compass";
import { E6BIllustrationLabels } from "./e6b_illustration_labels";

const ChakraCircle = chakra(Circle);

type IllustrationProps = {
  correction_data: t.TypeOf<typeof E6BData>;
};

export const E6BIllustration: FC<IllustrationProps> = ({ correction_data }) => {
  const {
    wind_direction,
    wind_speed,
    course,
    true_airspeed,
    heading,
    ground_speed,
  } = correction_data;

  const wind_color = useColorModeValue("orange.500", "orange.300");
  const course_color = useColorModeValue("red.600", "red.300");
  const heading_color = useColorModeValue("blue.600", "blue.300");
  const faint_color = useColorModeValue("gray.50", "gray.700");
  const circle_background = useColorModeValue("white", "gray.800");

  const normalize_length = (length: number) =>
    (length / Math.max(wind_speed, true_airspeed, ground_speed, 1)) * 20;

  const convert_to_radians = (aviation_degrees: number) => {
    const res = (((-aviation_degrees + 450) % 360) / 180) * Math.PI;
    return res;
  };

  const CourseArrow: React.FC = () => {
    const course_direction_radians = convert_to_radians(course);
    const length = normalize_length(ground_speed);
    return (
      <E6BIllustrationArrow
        id="course"
        length={length}
        color={course_color}
        from={{ x: 50, y: 50 }}
        to={{
          x: 50 + length * Math.cos(course_direction_radians),
          y: 50 - length * Math.sin(course_direction_radians),
        }}
      />
    );
  };

  const HeadingArrow: React.FC = () => {
    const heading_radians = convert_to_radians(heading);
    const length = normalize_length(true_airspeed);
    return (
      <E6BIllustrationArrow
        id="heading"
        length={length}
        color={heading_color}
        from={{ x: 50, y: 50 }}
        to={{
          x: 50 + length * Math.cos(heading_radians),
          y: 50 - length * Math.sin(heading_radians),
        }}
      />
    );
  };

  const WindArrow: React.FC = () => {
    const wind_direction_radians = convert_to_radians(wind_direction);
    const length = normalize_length(wind_speed);

    return (
      <E6BIllustrationArrow
        id="wind"
        length={length}
        color={wind_color}
        from={{
          x: 50 + 40 * Math.cos(wind_direction_radians),
          y: 50 - 40 * Math.sin(wind_direction_radians),
        }}
        to={{
          x: 50 + (40 - length) * Math.cos(wind_direction_radians),
          y: 50 - (40 - length) * Math.sin(wind_direction_radians),
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
              fill={faint_color}
              stroke={faint_color}
            />
            <ChakraCircle
              cx={50}
              cy={50}
              r={40}
              stroke={faint_color}
              fill="none"
            />
          </g>
          <E6BIllustrationLabels correction_data={correction_data} />
        </svg>
      </AspectRatio>
    </Flex>
  );
};
