import { css } from "@emotion/react";
import { mq } from "./breakpoints";

export const container = css`
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  ${mq.sm} {
    max-width: 640px;
  }
  ${mq.md} {
    max-width: 768px;
  }
  ${mq.lg} {
    max-width: 1024px;
  }
  ${mq.xl} {
    max-width: 1280px;
  }
  ${mq.xxl} {
    max-width: 1536px;
  }
`;
