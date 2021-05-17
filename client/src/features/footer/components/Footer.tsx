/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { css } from "@emotion/react";
import { lighten } from "polished";

import { ThemeObject } from "../../theme/interface";

import { container } from "../../../style/container";
import { shadow } from "../../../style/shadow";

import { ReactComponent as Heart } from "../assets/tabler-icon-heart.svg";
import { ReactComponent as Plane } from "../assets/tabler-icon-plane.svg";

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
          <div>
            Made with
            <Heart
              css={css`
                height: 0.8rem;
                display: inline;
                vertical-align: text-top;
              `}
            />
            for
            <Plane
              css={css`
                height: 0.8rem;
                display: inline;
                vertical-align: text-top;
              `}
            />
            Simulation
          </div>
          <div>Do not use for real world flight navigation.</div>
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
              <a
                href={`https://github.com/eigently/naviate-server/commit/${serverVersion}`}
                css={versionStyle}
              >
                {serverVersion}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
