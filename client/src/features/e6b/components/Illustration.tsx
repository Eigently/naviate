/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC, useState } from "react";
import { ThemeObject } from "../../theme/interface";
import { Canvas } from "@react-three/fiber";

type IllustrationProps = {
  themeObject: ThemeObject;
};

export const Illustration: FC<IllustrationProps> = ({ themeObject }) => {
  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <div
      css={css`
        display: flex;
        flex-direction: row;
        align-items: center;
        flex-grow: 1;
      `}
    >
      <Canvas>
        <mesh
          position={[-1.2, -0.5, 0]}
          scale={active ? 2 : 1}
          onClick={(event) => setActive(!active)}
          onPointerOver={(event) => setHover(true)}
          onPointerOut={(event) => setHover(false)}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[0, 5, 5]} />
        </mesh>
      </Canvas>
    </div>
  );
};
