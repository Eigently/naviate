import * as t from "io-ts";
import { FC } from "react";
import { E6BForm } from "./e6b_form";
import { E6BIllustration } from "./e6b_illustration";
import { E6BData } from "../interface";
import { Box } from "@chakra-ui/layout";

type E6BProps = {
  correction_data: t.TypeOf<typeof E6BData>;
  handle_form_input: (
    course: number,
    true_airspeed: number,
    wind_direction: number,
    wind_speed: number
  ) => void;
};

export const E6B: FC<E6BProps> = ({ correction_data, handle_form_input }) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
      borderWidth="1px"
      borderRadius="md"
      shadow="md"
    >
      <E6BForm
        handle_form_input={handle_form_input}
        correction_data={correction_data}
      />
      <E6BIllustration correction_data={correction_data} />
    </Box>
  );
};
