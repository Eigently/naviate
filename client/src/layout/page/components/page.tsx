/** @jsxImportSource @emotion/react */
import * as t from "io-ts";
import { css } from "@emotion/react";
import { FC, ReactNode } from "react";
import { ThemeObject } from "../../../theme/interface";

type PageProps = {
  children: ReactNode;
  theme_object: t.TypeOf<typeof ThemeObject>;
  HeaderContainer: ReactNode;
  FooterContainer: ReactNode;
};

export const Page: FC<PageProps> = ({
  theme_object,
  children,
  HeaderContainer,
  FooterContainer,
}) => {
  const styles = {
    container: css`
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      color: ${theme_object.colors.base};
      background-color: ${theme_object.colors.background};
      &,
      & * {
        transition: color 200ms, background-color 200ms;
      }
    `,
    grow: css`
      flex-grow: 1;
    `,
  };

  return (
    <div css={[styles.container]}>
      {HeaderContainer}
      <div css={[styles.grow]}>{children}</div>
      {FooterContainer}
    </div>
  );
};
