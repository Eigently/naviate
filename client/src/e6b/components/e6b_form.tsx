import * as t from "io-ts";
import { FC } from "react";
import { useFormik } from "formik";

import * as Yup from "yup";
import { E6BData } from "../interface";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Flex,
  Stack,
} from "@chakra-ui/react";

type FormProps = {
  correction_data: t.TypeOf<typeof E6BData>;
  handle_form_input: (
    course: number,
    true_airspeed: number,
    wind_direction: number,
    wind_speed: number
  ) => void;
};

export const E6BForm: FC<FormProps> = ({
  handle_form_input,
  correction_data,
}) => {
  const formik = useFormik({
    initialValues: {
      course: correction_data.course,
      true_airspeed: correction_data.true_airspeed,
      wind_direction: correction_data.wind_direction,
      wind_speed: correction_data.wind_speed,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object().shape({
      course: Yup.number()
        .required("Required.")
        .max(360, "At most 360°.")
        .min(0, "At least 0°."),
      true_airspeed: Yup.number().required("Required.").min(0, "At least 0."),
      wind_direction: Yup.number()
        .required("Required.")
        .max(360, "At most 360°.")
        .min(0, "At least 0°."),
      wind_speed: Yup.number().required("Required.").min(0, "At least 0."),
    }),
  });

  if (Object.keys(formik.errors).length === 0) {
    const { course, true_airspeed, wind_direction, wind_speed } = formik.values;
    handle_form_input(course, true_airspeed, wind_direction, wind_speed);
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack
        spacing="4"
        padding="4"
        borderRightWidth={{ md: "1px" }}
        borderBottomWidth={{ base: "1px", md: "0px" }}
      >
        <Heading size="lg">E6B Calculator</Heading>
        <FormControl
          id="course"
          isInvalid={!!formik.touched.course && !!formik.errors.course}
        >
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              Course
            </FormLabel>
            <FormErrorMessage fontSize="xs" textAlign="end" mt="0" mb="0.5">
              {formik.errors.course}
            </FormErrorMessage>
          </Flex>
          <Input
            type="number"
            value={formik.values.course}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="sm"
            borderRadius="md"
            min={0}
            max={360}
          />
        </FormControl>
        <FormControl
          id="true_airspeed"
          isInvalid={
            !!formik.touched.true_airspeed && !!formik.errors.true_airspeed
          }
        >
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              True Airspeed
            </FormLabel>
            <FormErrorMessage fontSize="xs" textAlign="end" mt="0" mb="0.5">
              {formik.errors.true_airspeed}
            </FormErrorMessage>
          </Flex>
          <Input
            type="number"
            value={formik.values.true_airspeed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="sm"
            borderRadius="md"
          />
        </FormControl>
        <FormControl
          id="wind_direction"
          isInvalid={
            !!formik.touched.wind_direction && !!formik.errors.wind_direction
          }
        >
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              Wind Direction
            </FormLabel>
            <FormErrorMessage fontSize="xs" textAlign="end" mt="0" mb="0.5">
              {formik.errors.wind_direction}
            </FormErrorMessage>
          </Flex>
          <Input
            type="number"
            value={formik.values.wind_direction}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="sm"
            borderRadius="md"
            min={0}
            max={360}
          />
        </FormControl>
        <FormControl
          id="wind_speed"
          isInvalid={!!formik.touched.wind_speed && !!formik.errors.wind_speed}
        >
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              Wind Speed
            </FormLabel>
            <FormErrorMessage fontSize="xs" textAlign="end" mt="0" mb="0.5">
              {formik.errors.wind_speed}
            </FormErrorMessage>
          </Flex>
          <Input
            type="number"
            value={formik.values.wind_speed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="sm"
            borderRadius="md"
          />
        </FormControl>
        <FormControl id="heading">
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              Heading
            </FormLabel>
          </Flex>
          <Input
            type="number"
            value={Math.round(correction_data.heading)}
            size="sm"
            disabled
            borderRadius="md"
          />
        </FormControl>
        <FormControl id="ground_speed">
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              Ground Speed
            </FormLabel>
          </Flex>
          <Input
            type="number"
            value={Math.round(correction_data.ground_speed)}
            size="sm"
            disabled
            borderRadius="md"
          />
        </FormControl>
        <FormControl id="wind_correction_angle">
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              Wind Correction Angle
            </FormLabel>
          </Flex>
          <Input
            value={
              (Math.round(correction_data.wind_correction_angle) <= 0
                ? ""
                : "+") + Math.round(correction_data.wind_correction_angle)
            }
            size="sm"
            disabled
            borderRadius="md"
          />
        </FormControl>
      </Stack>
    </form>
  );
};
