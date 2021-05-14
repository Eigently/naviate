/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";

import { mix } from "polished";
import { Circle, Line } from "@visx/shape";
import { MarkerArrow } from "@visx/marker";
import { Text } from "@visx/text";

import { ThemeObject } from "../../theme/interface";
import { E6BData } from "../interface";

type IllustrationProps = {
  themeObject: ThemeObject;
  correctionData: E6BData;
};

export const Illustration: FC<IllustrationProps> = ({
  themeObject,
  correctionData: {
    windDirection,
    windSpeed,
    course,
    trueAirspeed,
    heading,
    groundSpeed,
    windCorrectionAngle,
  },
}) => {
  const faintColor = mix(
    0.1,
    themeObject.colors.base,
    themeObject.colors.background
  );

  const normalizeLength = (length: number) =>
    (length / Math.max(windSpeed, trueAirspeed, groundSpeed, 1)) * 20;

  const convertToRadians = (aviationDegrees: number) => {
    const res = (((-aviationDegrees + 450) % 360) / 180) * Math.PI;
    // console.log(
    //   `${aviationDegrees} degrees is ${res} radians (${res / Math.PI}pi rads)`
    // );
    return res;
  };

  const nonzero = (a: any, val: number) => (Math.abs(val) > 0.05 ? a : <></>);

  const CourseArrow: React.FC = () => {
    const courseDirectionRadians = convertToRadians(course);
    const length = normalizeLength(groundSpeed);
    let startX = 50;
    let startY = 50;
    let endX = 50 + length * Math.cos(courseDirectionRadians);
    let endY = 50 - length * Math.sin(courseDirectionRadians);

    return nonzero(
      <>
        <MarkerArrow
          id="course-arrowhead"
          fill={themeObject.colors.naviateRed}
          refX={2}
          size={3}
        />
        <Line
          from={{ x: startX, y: startY }}
          to={{ x: endX, y: endY }}
          stroke={themeObject.colors.naviateRed}
          strokeWidth={1}
          markerEnd={"url(#course-arrowhead)"}
        />
      </>,
      length
    );
  };

  const HeadingArrow: React.FC = () => {
    const headingRadians = convertToRadians(heading);
    const length = normalizeLength(trueAirspeed);
    let startX = 50;
    let startY = 50;
    let endX = 50 + length * Math.cos(headingRadians);
    let endY = 50 - length * Math.sin(headingRadians);

    return nonzero(
      <>
        <MarkerArrow
          id="heading-arrowhead"
          fill={themeObject.colors.naviateDarkBlue}
          refX={2}
          size={3}
        />
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={themeObject.colors.naviateDarkBlue}
          strokeWidth={1}
          markerEnd={"url(#heading-arrowhead)"}
        />
      </>,
      length
    );
  };

  const WindArrow: React.FC = () => {
    const windDirectionRadians = convertToRadians(windDirection);
    const length = normalizeLength(windSpeed);

    let startX = 50 + 40 * Math.cos(windDirectionRadians);
    let startY = 50 - 40 * Math.sin(windDirectionRadians);
    let endX = 50 + (40 - length) * Math.cos(windDirectionRadians);
    let endY = 50 - (40 - length) * Math.sin(windDirectionRadians);

    return nonzero(
      <>
        <MarkerArrow
          id="wind-arrowhead"
          fill={themeObject.colors.naviateOrange}
          refX={2}
          size={3}
        />
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={themeObject.colors.naviateOrange}
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
        grid-column: span 2 / span 2;
        display: flex;
        justify-content: center;
        margin: 1rem;
      `}
    >
      <svg
        viewBox="0 0 100 100"
        css={css`
          max-width: 500px;
        `}
      >
        <g>
          <Circle
            cx={50}
            cy={50}
            r={40}
            stroke={faintColor}
            fill={themeObject.colors.background}
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
              fill: ${themeObject.colors.base};
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
              fill: ${themeObject.colors.base};
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
              fill: ${themeObject.colors.base};
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
              fill: ${themeObject.colors.base};
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
          <Circle cx={50} cy={50} r={1} fill={themeObject.colors.base} />
        </g>
        <g>
          <Circle
            cx="0.1rem"
            cy="0.1rem"
            r="0.1rem"
            fill={themeObject.colors.naviateOrange}
          />
          <Text
            x="0.3rem"
            y="0.1rem"
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${themeObject.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`Wind: ${windDirection} @ ${windSpeed}`}
          </Text>
          <Text
            x="0.3rem"
            y="0.4rem"
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${themeObject.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`WCA: ${windCorrectionAngle <= 0 ? "" : "+"}${Math.round(
              windCorrectionAngle
            )}°`}
          </Text>
          <Circle
            cx="4.5rem"
            cy="0.1rem"
            r="0.1rem"
            fill={themeObject.colors.naviateRed}
          />
          <Text
            x="4.7rem"
            y="0.1rem"
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${themeObject.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`Course: ${course}°`}
          </Text>
          <Circle
            cx="4.5rem"
            cy="0.4rem"
            r="0.1rem"
            fill={themeObject.colors.naviateDarkBlue}
          />
          <Text
            x="4.7rem"
            y="0.4rem"
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${themeObject.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`Heading: ${Math.round(heading)}°`}
          </Text>
          <Circle
            cx="0.1rem"
            cy="5.5rem"
            r="0.1rem"
            fill={themeObject.colors.naviateRed}
          />
          <Text
            x="0.3rem"
            y="5.5rem"
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${themeObject.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`GS: ${Math.round(groundSpeed)}`}
          </Text>
          <Circle
            cx="0.1rem"
            cy="5.8rem"
            r="0.1rem"
            fill={themeObject.colors.naviateDarkBlue}
          />
          <Text
            x="0.3rem"
            y="5.8rem"
            css={css`
              font-size: 0.2rem;
              font-family: monospace;
              font-weight: bold;
              fill: ${themeObject.colors.base};
            `}
            textAnchor="start"
            verticalAnchor="middle"
          >
            {`TAS: ${trueAirspeed}`}
          </Text>
        </g>
      </svg>
    </div>
  );
};
