/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { readableColor } from "polished";
import { FC } from "react";
import { Link } from "react-router-dom";
import { light_theme } from "../../theme/colors/light_theme";

export const NotFound: FC = () => {
  const styles = {
    full_page: css`
      min-height: 100vh;
      background-color: ${light_theme.colors.naviate_dark_blue};
      color: ${readableColor(light_theme.colors.naviate_dark_blue)};
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
    heading: css`
      font-size: 2rem;
    `,
  };

  return (
    <div css={[styles.full_page]}>
      <div css={[styles.heading]}>404. Oops.</div>
      <Link to="/">Click here to go home.</Link>
    </div>
  );
};
