/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { ThemeObject } from "../theme/interface";

type SurroundingProps = {
  args: {
    theme_object: ThemeObject;
  };
  children: ReactNode;
};

export const Surrounding: FC<SurroundingProps> = ({
  children,
  args: {
    theme_object: {
      colors: { background },
    },
  },
}) => {
  const styles = {
    background: css`
      background-color: ${background};
    `,
    padding: css`
      padding: 3rem;
    `,
  };

  return <div css={[styles.background, styles.padding]}>{children}</div>;
};
