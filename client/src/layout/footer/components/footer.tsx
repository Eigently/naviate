/** @jsxImportSource @emotion/react */
import { FC } from "react";
import { css } from "@emotion/react";
import { lighten } from "polished";

import { ThemeObject } from "../../../theme/interface";

import { container } from "../../../style/container";
import { shadow } from "../../../style/shadow";

import { ReactComponent as Heart } from "../assets/tabler-icon-heart.svg";
import { ReactComponent as Plane } from "../assets/tabler-icon-plane.svg";

type FooterProps = {
  theme_object: ThemeObject;
  client_version: String;
  server_version?: String;
};

export const Footer: FC<FooterProps> = ({
  theme_object,
  client_version,
  server_version,
}) => {
  const styles = {
    outer_footer: css`
      color: ${theme_object.colors.base};
      background-color: ${lighten(0.04, theme_object.colors.background)};
      font-size: 0.8rem;
      padding: 1rem 2rem;
    `,
    inner_footer: css`
      ${container}
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
    `,
    right_footer: css`
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
    `,
    inline_svg: css`
      height: 0.8rem;
      display: inline;
      vertical-align: baseline;
    `,
    version_label: css`
      text-align: right;
      margin-right: 0.5rem;
    `,
    version: css`
      font-family: monospace;
    `,
  };

  return (
    <div css={[shadow.surrounding, styles.outer_footer]}>
      <div css={[styles.inner_footer]}>
        <div>
          <div>
            Made with
            <Heart css={[styles.inline_svg]} />
            for
            <Plane css={[styles.inline_svg]} />
            Simulation
          </div>
          <div>Do not use for real world flight navigation.</div>
        </div>
        <div css={[styles.right_footer]}>
          <div css={[styles.version_label]}>Client:</div>
          <a
            href={`https://github.com/eigently/naviate-client/commit/${client_version}`}
            css={[styles.version]}
          >
            {client_version}
          </a>
          {server_version && (
            <>
              <div css={[styles.version_label]}>Server:</div>
              <a
                href={`https://github.com/eigently/naviate-server/commit/${server_version}`}
                css={[styles.version]}
              >
                {server_version}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
