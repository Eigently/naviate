/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { ThemeObject } from "../../theme/interface";

type PageProps = {
  HeaderContainer: React.ReactNode;
  FooterContainer: React.ReactNode;
  themeObject: ThemeObject;
};

export const Page: FC<PageProps> = (props) => {
  const { themeObject, HeaderContainer, FooterContainer } = props;

  return (
    <div
      css={css`
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        color: ${themeObject.colors.base};
        background-color: ${themeObject.colors.background};
      `}
    >
      {HeaderContainer}
      <div
        css={css`
          flex-grow: 1;
        `}
      />
      {FooterContainer}
    </div>
  );
};
