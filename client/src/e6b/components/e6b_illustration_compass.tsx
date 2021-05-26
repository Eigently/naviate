/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { Circle, Line } from "@visx/shape";
import { Text } from "@visx/text";
import * as t from "io-ts";
import { mix } from "polished";
import { ThemeObject } from "../../theme/interface";

type IllustrationProps = {
  theme_object: t.TypeOf<typeof ThemeObject>;
};

export const E6BIllustrationCompass: React.FC<IllustrationProps> = ({
  theme_object,
}) => {
  const faint_color = mix(
    0.1,
    theme_object.colors.base,
    theme_object.colors.background
  );

  const styles = {
    label: css`
      font-size: 0.3rem;
      font-family: monospace;
      fill: ${theme_object.colors.base};
    `,
  };

  return (
    <g>
      <Circle
        cx={50}
        cy={50}
        r={40}
        stroke={faint_color}
        fill={theme_object.colors.background}
      />
      <Line
        from={{ x: 10, y: 50 }}
        to={{ x: 90, y: 50 }}
        stroke={faint_color}
      />
      <Line
        from={{ x: 50, y: 10 }}
        to={{ x: 50, y: 90 }}
        stroke={faint_color}
      />
      <Text
        x={50}
        y={9}
        css={[styles.label]}
        textAnchor="middle"
        verticalAnchor="end"
      >
        N
      </Text>
      <Text
        x={50}
        y={91}
        css={[styles.label]}
        textAnchor="middle"
        verticalAnchor="start"
      >
        S
      </Text>
      <Text
        x={9}
        y={50}
        css={[styles.label]}
        textAnchor="end"
        verticalAnchor="middle"
      >
        W
      </Text>
      <Text
        x={91}
        y={50}
        css={[styles.label]}
        textAnchor="start"
        verticalAnchor="middle"
      >
        E
      </Text>
    </g>
  );
};
