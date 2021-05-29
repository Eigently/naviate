import { chakra, useColorModeValue } from "@chakra-ui/react";
import { Circle, Line } from "@visx/shape";
import { Text } from "@visx/text";

export const E6BIllustrationCompass: React.FC = () => {
  const ChakraCircle = chakra(Circle);
  const ChakraLine = chakra(Line);
  const ChakraText = chakra(Text);

  const textColor = useColorModeValue("black", "white");
  const faintColor = useColorModeValue("gray.50", "gray.700");
  const circleBackground = useColorModeValue("white", "gray.800");

  return (
    <g>
      <ChakraCircle
        cx={50}
        cy={50}
        r={40}
        stroke={faintColor}
        fill={circleBackground}
      />
      <ChakraLine
        from={{ x: 10, y: 50 }}
        to={{ x: 90, y: 50 }}
        stroke={faintColor}
      />
      <ChakraLine
        from={{ x: 50, y: 10 }}
        to={{ x: 50, y: 90 }}
        stroke={faintColor}
      />
      <ChakraText
        x={50}
        y={8}
        fill={textColor}
        fontSize="0.25rem"
        fontFamily="monospace"
        textAnchor="middle"
        verticalAnchor="end"
      >
        N
      </ChakraText>
      <ChakraText
        x={50}
        y={92}
        fill={textColor}
        fontSize="0.25rem"
        fontFamily="monospace"
        textAnchor="middle"
        verticalAnchor="start"
      >
        S
      </ChakraText>
      <ChakraText
        x={8}
        y={50}
        fill={textColor}
        fontSize="0.25rem"
        fontFamily="monospace"
        textAnchor="end"
        verticalAnchor="middle"
      >
        W
      </ChakraText>
      <ChakraText
        x={92}
        y={50}
        fill={textColor}
        fontSize="0.25rem"
        fontFamily="monospace"
        textAnchor="start"
        verticalAnchor="middle"
      >
        E
      </ChakraText>
    </g>
  );
};
