/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { css } from "@emotion/react";
import { lighten } from "polished";

import { ThemeObject } from "../theme/interface";

import { container } from "../../style/container";
import { shadow } from "../../style/shadow";
import { versions } from "process";

type FooterProps = {
  themeObject: ThemeObject;
  clientVersion: String;
  serverVersion?: String;
};

export const Footer: FC<FooterProps> = (props) => {
  const { themeObject, clientVersion, serverVersion } = props;

  const versionLabelStyle = css`
    text-align: right;
    margin-right: 0.5rem;
  `;
  const versionStyle = css`
    font-family: monospace;
  `;

  return (
    <div
      css={[
        shadow.surrounding,
        css`
          color: ${themeObject.colors.base};
          background-color: ${lighten(0.04, themeObject.colors.background)};
          font-size: 0.8rem;
          padding: 1rem 2rem;
        `,
      ]}
    >
      <div
        css={css`
          ${container}
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        `}
      >
        <div>
          Copyright &copy; {new Date().getFullYear()} Eigently. All rights
          reserved.
        </div>
        <div
          css={css`
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto;
          `}
        >
          <div css={versionLabelStyle}>Client:</div>
          <a
            href={`https://github.com/eigently/naviate-client/commit/${clientVersion}`}
            css={versionStyle}
          >
            {clientVersion}
          </a>
          {serverVersion && (
            <>
              <div css={versionLabelStyle}>Server:</div>
              <div css={versionStyle}>{serverVersion}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
