/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { lighten } from "polished";
import { FC, ReactNode } from "react";

import { ThemeObject } from "../../theme/interface";

type NavItemProps = {
  active?: boolean;
  item: ReactNode;
  themeObject: ThemeObject;
};

export const NavItem: FC<NavItemProps> = ({
  active = false,
  item,
  themeObject,
}) => {
  let navItemStyle = css`
    color: white;
    align-items: stretch;
    padding: 1rem 0.5rem;
  `;

  if (active) {
    const backgroundColor = lighten(0.15, themeObject.colors.naviateDarkBlue);
    // const backgroundColor = linearGradient({
    //   colorStops: [
    //     `${themeObject.colors.naviateDarkBlue} 0%`,
    //     `${themeObject.colors.naviateDarkBlue} 100%`,
    //   ],
    //   toDirection: "to top",
    //   fallback: lighten(0.15, themeObject.colors.naviateDarkBlue),
    // });
    navItemStyle = css`
      ${navItemStyle}
      background-color: ${backgroundColor};
      padding: 1rem 0.5rem calc(1rem - 2px) 0.5rem;
      border-bottom: solid 2px white;
    `;
  }

  return (
    // <div css={containingDivStyle}>
    <div css={navItemStyle}>{item}</div>
    // </div>
  );
};
