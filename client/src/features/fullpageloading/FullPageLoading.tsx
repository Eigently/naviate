/** @jsxImportSource @emotion/react */
import { css, keyframes } from "@emotion/react";
import { FC, useEffect, useState } from "react";
import { lightTheme } from "../theme/colors/lightTheme";
import { ReactComponent as Plane } from "./assets/plane.svg";

export const FullPageLoading: FC = () => {
  const planeAnimation = keyframes`
  0%, 100% {
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

  const [message, setMessage] = useState(
    messages[Math.floor(Math.random() * messages.length)]
  );

  useEffect(() => {
    const timeout = setTimeout(
      () => setMessage(messages[Math.floor(Math.random() * messages.length)]),
      4000
    );
    return () => clearTimeout(timeout);
  });

  return (
    <div
      css={css`
        display: flex;
        background-color: ${lightTheme.colors.naviateDarkBlue};
        flex-grow: 1;
        font-size: 1rem;
        color: white;
      `}
    >
      <div
        css={css`
          margin: auto;
        `}
      >
        <div>
          <Plane
            css={css`
              animation: ${planeAnimation} 4s ease-in-out infinite;
              width: 30rem;
              height: 10rem;
              fill: white;
            `}
          />
        </div>
        <div
          css={css`
            text-align: center;
            font-size: 2.5rem;
            font-weight: 300;
          `}
        >
          {message}...
        </div>
      </div>
    </div>
  );
};
