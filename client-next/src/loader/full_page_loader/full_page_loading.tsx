import { useColorModeValue } from "@chakra-ui/color-mode";
import { chakra } from "@chakra-ui/react";
import { css, keyframes } from "@emotion/react";
import { FC, useEffect, useState } from "react";

import { ReactComponent as Plane } from "./assets/plane.svg";
const ChakraPlane = chakra(Plane);

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

  const backgroundColor = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");

  const styles = {
    container: css`
      display: flex;
      flex-grow: 1;
      font-size: 1rem;
    `,
    centering: css`
      margin: auto;
    `,
    plane: css`
      animation: ${planeAnimation} 4s ease-in-out infinite;
      width: 30rem;
      height: 10rem;
    `,
    message: css`
      text-align: center;
      font-size: 2.5rem;
      font-weight: 300;
    `,
  };

  return (
    <chakra.div css={[styles.container]} bg={backgroundColor} color={color}>
      <div css={[styles.centering]}>
        <div>
          <ChakraPlane css={[styles.plane]} fill={color} />
        </div>
        <div css={[styles.message]}>{message}...</div>
      </div>
    </chakra.div>
  );
};
