/** @jsxImportSource @emotion/react */

import { MarkerArrow } from "@visx/marker";
import { Line } from "@visx/shape";
import { FC } from "react";

type E6BIllustrationArrowProps = {
  id: string;
  color: string;
  length: number;
  from: {
    x: number;
    y: number;
  };
  to: {
    x: number;
    y: number;
  };
};

const nonzero = (a: any, val: number) => (Math.abs(val) > 0.05 ? a : <></>);

export const E6BIllustrationArrow: FC<E6BIllustrationArrowProps> = ({
  id,
  color,
  length,
  from,
  to,
}) => {
  return nonzero(
    <>
      <MarkerArrow id={`${id}-arrowhead`} fill={color} refX={2} size={3} />
      <Line
        from={from}
        to={to}
        stroke={color}
        strokeWidth={1}
        markerEnd={`url(#${id}-arrowhead)`}
      />
    </>,
    length
  );
};
