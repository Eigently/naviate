/** @jsxImportSource @emotion/react */
import * as t from "io-ts";
import { css } from "@emotion/react";
import { ThemeObject } from "../../theme/interface";
import { Circle } from "@visx/shape";
import { Text } from "@visx/text";

type IllustrationLabelProps = {
  color?: string;
  label: string;
  theme_object: t.TypeOf<typeof ThemeObject>;
  x: number;
  y: number;
};

export const E6BIllustrationLabel: React.FC<IllustrationLabelProps> = ({
  color,
  label,
  x,
  y,
  theme_object,
}) => {
  const styles = {
    label: css`
      font-size: 0.2rem;
      font-family: monospace;
      font-weight: bold;
      fill: ${theme_object.colors.base};
    `,
  };

  return (
    <>
      {color && <Circle cx={x} cy={y} r={1.5} fill={color} />}
      <Text
        x={x + 3}
        y={y}
        css={[styles.label]}
        textAnchor="start"
        verticalAnchor="middle"
      >
        {label}
      </Text>
    </>
  );
};
