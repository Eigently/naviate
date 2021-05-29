import { FC } from "react";
import { E6BForm } from "./e6b_form";
import { E6BIllustration } from "./e6b_illustration";
import { E6BData } from "../interface";
import { Box } from "@chakra-ui/layout";

type E6BProps = {
  correctionData: E6BData;
  handleFormInput: (
    course: number,
    true_airspeed: number,
    wind_direction: number,
    wind_speed: number
  ) => void;
};

export const E6B: FC<E6BProps> = ({ correctionData, handleFormInput }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
      borderWidth="1px"
      borderRadius="md"
      shadow="md"
    >
      <E6BForm
        handleFormInput={handleFormInput}
        correctionData={correctionData}
      />
      <E6BIllustration correctionData={correctionData} />
    </Box>
  );
};
