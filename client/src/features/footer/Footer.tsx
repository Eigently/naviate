/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { css } from "@emotion/react";
import { lighten } from "polished";

import { ThemeObject } from "../theme/interface";

import { container } from "../../style/container";
import { shadow } from "../../style/shadow";

type FooterProps = {
  themeObject: ThemeObject;
};

export const Footer: FC<FooterProps> = (props) => {
  const { themeObject } = props;

  return (
    <div
      css={css`
        ${shadow.surrounding};
        background-color: ${lighten(0.04, themeObject.colors.background)};
        font-size: 0.8rem;
        padding: 1rem 2rem;
      `}
    >
      <div
        css={css`
          ${container}
          display: flex;
          justify-content: space-between;
        `}
      >
        <div>
          Copyright &copy; {new Date().getFullYear()} Eigently. All rights
          reserved.
        </div>
        <a
          href={`https://gitlab.com/eigently/naviate-client/-/commit/${process.env.REACT_APP_GIT_SHA}`}
          css={css`
            font-family: monospace;
          `}
        >
          Version: {process.env.REACT_APP_GIT_SHA || "dev"}
        </a>
      </div>
    </div>
  );
};
