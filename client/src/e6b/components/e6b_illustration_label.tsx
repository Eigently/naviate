import { Circle } from "@visx/shape";
import { Text } from "@visx/text";
import { chakra, useColorModeValue } from "@chakra-ui/system";

type IllustrationLabelProps = {
  color?: string;
  label: string;
  x: number;
  y: number;
};

const ChakraCircle = chakra(Circle);
const ChakraText = chakra(Text);

export const E6BIllustrationLabel: React.FC<IllustrationLabelProps> = ({
  color,
  label,
  x,
  y,
}) => {
  const fill_color = useColorModeValue("black", "white");

  return (
    <>
      {color && <ChakraCircle cx={x} cy={y} r={1.5} fill={color} />}
      <ChakraText
        x={x + 3}
        y={y}
        fontSize="0.2rem"
        fontFamily="monospace"
        fontWeight="bold"
        fill={fill_color}
        textAnchor="start"
        verticalAnchor="middle"
      >
        {label}
      </ChakraText>
    </>
  );
};
