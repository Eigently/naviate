/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { lighten } from "polished";
import { FC, ReactNode } from "react";

import { ThemeObject } from "../../theme/interface";

type NavItemProps = {
  active?: boolean;
  item: ReactNode;
  theme_object: ThemeObject;
};

export const NavItem: FC<NavItemProps> = ({
  active = false,
  item,
  theme_object,
}) => {
  let styles = {
    nav_item: css`
      color: white;
      align-items: stretch;
      padding: 1rem 0.5rem;
    `,
    nav_item_active: css`
      background-color: ${lighten(0.15, theme_object.colors.naviate_dark_blue)};
      padding: 1rem 0.5rem calc(1rem - 2px) 0.5rem;
      border-bottom: solid 2px white;
    `,
  };

  return (
    <div css={[styles.nav_item, active && styles.nav_item_active]}>{item}</div>
  );
};
