/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { light_theme } from "../../theme/colors/light_theme";
import { ReactComponent as Plane } from "./assets/plane.svg";

export const FullPageLoading: FC = () => {
  const planeAnimation = keyframes`
    0%,
    100% {
      transform: translate(-20px, 10px) rotate(10deg);
    }

    15% {
      transform: translate(-20px, -30px) rotate(20deg);
    }

    40% {
      transform: translate(20px, -40px) rotate(-20deg);
    }

    60% {
      transform: translate(-20px, -30px) rotate(20deg);
    }

    80% {
      transform: translate(20px, 10px) rotate(-20deg);
    }
  `;

  const messages = [
    "Preparing checklists",
    "Delivering safety briefing",
    "Calculating weight and fuel",
    "Flying Naviate",
    "Trimming ailerons",
    "Tuning radios",
    "Computing takeoff performance",
    "Masking up",
    "Connecting the world",
    "Loading passengers",
  ];

  const [message, set_message] = useState(
    messages[Math.floor(Math.random() * messages.length)]
  );

  useEffect(() => {
    const timeout = setTimeout(
      () => set_message(messages[Math.floor(Math.random() * messages.length)]),
      4000
    );
    return () => clearTimeout(timeout);
  });

  const styles = {
    container: css`
      display: flex;
      background-color: ${light_theme.colors.naviate_dark_blue};
      flex-grow: 1;
      font-size: 1rem;
      color: white;
    `,
    centering: css`
      margin: auto;
    `,
    plane: css`
      animation: ${planeAnimation} 4s ease-in-out infinite;
      width: 30rem;
      height: 10rem;
      fill: white;
    `,
    message: css`
      text-align: center;
      font-size: 2.5rem;
      font-weight: 300;
    `,
  };

  return (
    <div css={[styles.container]}>
      <div css={[styles.centering]}>
        <div>
          <Plane css={[styles.plane]} />
        </div>
        <div css={[styles.message]}>{message}...</div>
      </div>
    </div>
  );
};
