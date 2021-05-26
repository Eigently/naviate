/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";

import { container } from "../../../style/container";
import { shadow } from "../../../style/shadow";
import { NavItem } from "../../../navigation/navbar_item/navbar_item";

import { ThemeToggleButton } from "../../../theme/components/theme_toggle_button";
import { Theme, ThemeObject } from "../../../theme/interface";

import { ReactComponent as NaviateLogo } from "../assets/wings.svg";
import { ReactComponent as E6B } from "../assets/tabler-icon-compass.svg";
import { ReactComponent as Performance } from "../assets/tabler-icon-plane-departure.svg";
import { ReactComponent as Plan } from "../assets/tabler-icon-calendar-time.svg";
import { ReactComponent as Notes } from "../assets/tabler-icon-notes.svg";

type HeaderProps = {
  theme: Theme;
  theme_object: ThemeObject;
  handle_toggle_theme: () => void;
};

export const Header: FC<HeaderProps> = ({
  theme,
  theme_object,
  handle_toggle_theme,
}) => {
  const styles = {
    header: css`
      color: white;
      background-color: ${theme_object.colors.naviate_dark_blue};
      ${shadow.md}
    `,
    inner_header: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    `,
    left_header: css`
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0rem 0.5rem;
    `,
    naviate_logo: css`
      height: 2rem;
      margin: 0rem 0.5rem;
    `,
    nav_items: css`
      display: flex;
      flex-direction: row;
    `,
  };

  return (
    <div css={[styles.header]}>
      <div css={[container, styles.inner_header]}>
        <div css={[styles.left_header]}>
          <NaviateLogo css={[styles.naviate_logo]} />
          <div css={[styles.nav_items]}>
            <NavItem active={true} item={<E6B />} theme_object={theme_object} />
            <NavItem item={<Performance />} theme_object={theme_object} />
            <NavItem item={<Plan />} theme_object={theme_object} />
            <NavItem item={<Notes />} theme_object={theme_object} />
          </div>
        </div>
        <div
          css={css`
            display: flex;
            flex-direction: row;
            font-size: 1.2rem;
            margin: 0rem 1rem;
          `}
        >
          <ThemeToggleButton
            theme={theme}
            theme_object={theme_object}
            handle_toggle_theme={handle_toggle_theme}
          />
        </div>
      </div>
    </div>
  );
};
