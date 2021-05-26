/** @jsxImportSource @emotion/react */
import * as t from "io-ts";
import { css } from "@emotion/react";
import { FC } from "react";

import { Circle } from "@visx/shape";

import { ThemeObject } from "../../theme/interface";
import { E6BData } from "../interface";
import { mq } from "../../style/breakpoints";
import { E6BIllustrationArrow } from "./e6b_illustration_arrow";
import { E6BIllustrationCompass } from "./e6b_illustration_compass";
import { E6BIllustrationLabels } from "./e6b_illustration_labels";

type IllustrationProps = {
  theme_object: t.TypeOf<typeof ThemeObject>;
  correction_data: t.TypeOf<typeof E6BData>;
};

export const E6BIllustration: FC<IllustrationProps> = ({
  theme_object,
  correction_data,
}) => {
  const {
    wind_direction,
    wind_speed,
    course,
    true_airspeed,
    heading,
    ground_speed,
  } = correction_data;

  const styles = {
    svg_container: css`
      grid-column: span 1 / span 1;
      ${mq.md} {
        grid-column: span 2 / span 2;
      }
      display: flex;
      justify-content: center;
      align-items: stretch;
      padding: 1rem;
      min-height: 200px;
    `,
    svg: css`
      max-width: 500px;
      flex-grow: 1;
    `,
  };

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
        color={theme_object.colors.naviate_red}
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
        color={theme_object.colors.naviate_dark_blue}
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
        color={theme_object.colors.naviate_orange}
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
    <div css={[styles.svg_container]}>
      <svg viewBox="0 0 100 100" css={[styles.svg]}>
        <E6BIllustrationCompass theme_object={theme_object} />
        <g>
          <WindArrow />
          <CourseArrow />
          <HeadingArrow />
        </g>
        <g>
          <Circle cx={50} cy={50} r={1} fill={theme_object.colors.base} />
        </g>
        <E6BIllustrationLabels
          theme_object={theme_object}
          correction_data={correction_data}
        />
      </svg>
    </div>
  );
};
