/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";

import { mix } from "polished";
import { Circle, Line } from "@visx/shape";
import { MarkerArrow } from "@visx/marker";
import { Text } from "@visx/text";

import { ThemeObject } from "../../theme/interface";
import { E6BData } from "../interface";
import { mq } from "../../style/breakpoints";

type IllustrationProps = {
  theme_object: ThemeObject;
  correction_data: E6BData;
};

export const E6BIllustration: FC<IllustrationProps> = ({
  theme_object,
  correction_data: {
    wind_direction,
    wind_speed,
    course,
    true_airspeed,
    heading,
    ground_speed,
    wind_correction_angle,
  },
}) => {
  const faintColor = mix(
    0.1,
    theme_object.colors.base,
    theme_object.colors.background
  );

  const normalizeLength = (length: number) =>
    (length / Math.max(wind_speed, true_airspeed, ground_speed, 1)) * 20;

  const convertToRadians = (aviationDegrees: number) => {
    const res = (((-aviationDegrees + 450) % 360) / 180) * Math.PI;
    return res;
  };

  const nonzero = (a: any, val: number) => (Math.abs(val) > 0.05 ? a : <></>);

  const CourseArrow: React.FC = () => {
    const courseDirectionRadians = convertToRadians(course);
    const length = normalizeLength(ground_speed);
    let startX = 50;
    let startY = 50;
    let endX = 50 + length * Math.cos(courseDirectionRadians);
    let endY = 50 - length * Math.sin(courseDirectionRadians);

    return nonzero(
      <>
        <MarkerArrow
          id="course-arrowhead"
          fill={theme_object.colors.naviate_red}
          refX={2}
          size={3}
        />
        <Line
          from={{ x: startX, y: startY }}
          to={{ x: endX, y: endY }}
          stroke={theme_object.colors.naviate_red}
          strokeWidth={1}
          markerEnd={"url(#course-arrowhead)"}
        />
      </>,
      length
    );
  };

  const HeadingArrow: React.FC = () => {
    const headingRadians = convertToRadians(heading);
    const length = normalizeLength(true_airspeed);
    let startX = 50;
    let startY = 50;
    let endX = 50 + length * Math.cos(headingRadians);
    let endY = 50 - length * Math.sin(headingRadians);

    return nonzero(
      <>
        <MarkerArrow
          id="heading-arrowhead"
          fill={theme_object.colors.naviate_dark_blue}
          refX={2}
          size={3}
        />
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={theme_object.colors.naviate_dark_blue}
          strokeWidth={1}
          markerEnd={"url(#heading-arrowhead)"}
        />
      </>,
      length
    );
  };

  const WindArrow: React.FC = () => {
    const windDirectionRadians = convertToRadians(wind_direction);
    const length = normalizeLength(wind_speed);

    let startX = 50 + 40 * Math.cos(windDirectionRadians);
    let startY = 50 - 40 * Math.sin(windDirectionRadians);
    let endX = 50 + (40 - length) * Math.cos(windDirectionRadians);
    let endY = 50 - (40 - length) * Math.sin(windDirectionRadians);

    return nonzero(
      <>
        <MarkerArrow
          id="wind-arrowhead"
          fill={theme_object.colors.naviate_orange}
          refX={2}
          size={3}
        />
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={theme_object.colors.naviate_orange}
          strokeWidth={1}
          markerEnd={"url(#wind-arrowhead)"}
        />
      </>,
      length
    );
  };

  return (
    <div
      css={css`
        grid-column: span 1 / span 1;
        ${mq.md} {
          grid-column: span 2 / span 2;
        }
        display: flex;
        justify-content: center;
        align-items: stretch;
        margin: 1rem;
        min-height: 200px;
      `}
    >
      <svg
        viewBox="0 0 100 100"
        css={css`
          max-width: 500px;
          flex-grow: 1;
        `}
      >
        <g>
          <Circle
            cx={50}
            cy={50}
            r={40}
            stroke={faintColor}
            fill={theme_object.colors.background}
          />
          <Line
            from={{ x: 10, y: 50 }}
            to={{ x: 90, y: 50 }}
            stroke={faintColor}
          />
          <Line
            from={{ x: 50, y: 10 }}
            to={{ x: 50, y: 90 }}
            stroke={faintColor}
          />
          {/* <line x1={50} y1={10} x2={50} y2={90} stroke={faintColor} /> */}
          <Text
            x={50}
            y={9}
            css={css`
              font-size: 0.4rem;
              font-family: monospace;
              fill: ${theme_object.colors.base};
            `}
            textAnchor="middle"
            verticalAnchor="end"
          >
            N
          </Text>
          <Text
            x={50}
            y={91}
            css={css`
              font-size: 0.4rem;
              font-family: monospace;
              fill: ${theme_object.colors.base};
            `}
            textAnchor="middle"
            verticalAnchor="start"
          >
            S
          </Text>
          <Text
            x={9}
            y={50}
            css={css`
              font-size: 0.4rem;
              font-family: monospace;
              fill: ${theme_object.colors.base};
            `}
            textAnchor="end"
            verticalAnchor="middle"
          >
            W
          </Text>
          <Text
            x={91}
            y={50}
            css={css`
              font-size: 0.4rem;
              font-family: monospace;
              fill: ${theme_object.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            E
          </Text>
        </g>
        <g>
          <WindArrow />
          <CourseArrow />
          <HeadingArrow />
        </g>
        <g>
          <Circle cx={50} cy={50} r={1} fill={theme_object.colors.base} />
        </g>
        <g>
          <Circle
            cx={2}
            cy={2}
            r={1.5}
            fill={theme_object.colors.naviate_orange}
          />
          <Text
            x={5}
            y={2}
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${theme_object.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`Wind: ${wind_direction} @ ${wind_speed}`}
          </Text>
          <Text
            x={5}
            y={7}
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${theme_object.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`WCA: ${wind_correction_angle <= 0 ? "" : "+"}${Math.round(
              wind_correction_angle
            )}°`}
          </Text>
          <Circle
            cx={70}
            cy={2}
            r={1.5}
            fill={theme_object.colors.naviate_red}
          />
          <Text
            x={73}
            y={2}
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${theme_object.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`Course: ${course}°`}
          </Text>
          <Circle
            cx={70}
            cy={7}
            r={1.5}
            fill={theme_object.colors.naviate_dark_blue}
          />
          <Text
            x={73}
            y={7}
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${theme_object.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`Heading: ${Math.round(heading)}°`}
          </Text>
          <Circle
            cx={2}
            cy={90}
            r={1.5}
            fill={theme_object.colors.naviate_red}
          />
          <Text
            x={5}
            y={90}
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${theme_object.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`GS: ${Math.round(ground_speed)}`}
          </Text>
          <Circle
            cx={2}
            cy={95}
            r={1.5}
            fill={theme_object.colors.naviate_dark_blue}
          />
          <Text
            x={5}
            y={95}
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${theme_object.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`TAS: ${true_airspeed}`}
          </Text>
        </g>
      </svg>
    </div>
  );
};
