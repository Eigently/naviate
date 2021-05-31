import { chakra, Link, useColorModeValue } from "@chakra-ui/react";
import { css } from "@emotion/react";
import { FC } from "react";

export const NotFound: FC = () => {
  const styles = {
    fullPage: css`
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `,
    heading: css`
      font-size: 2rem;
    `,
  };

  const backgroundColor = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");

  return (
    <chakra.div css={[styles.fullPage]} bg={backgroundColor} color={color}>
      <div css={[styles.heading]}>404. Oops.</div>
      <Link href="/">Click here to go home.</Link>
    </chakra.div>
  );
};
