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
  correctionData: E6BData;
  handleFormInput: (
    course: number,
    trueAirspeed: number,
    windDirection: number,
    windSpeed: number
  ) => void;
};

export const E6BForm: FC<FormProps> = ({ handleFormInput, correctionData }) => {
  const formik = useFormik({
    initialValues: {
      course: correctionData.course,
      trueAirspeed: correctionData.trueAirspeed,
      windDirection: correctionData.windDirection,
      windSpeed: correctionData.windSpeed,
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    validationSchema: Yup.object().shape({
      course: Yup.number()
        .required("Required.")
        .max(360, "At most 360°.")
        .min(0, "At least 0°."),
      trueAirspeed: Yup.number().required("Required.").min(0, "At least 0."),
      windDirection: Yup.number()
        .required("Required.")
        .max(360, "At most 360°.")
        .min(0, "At least 0°."),
      windSpeed: Yup.number().required("Required.").min(0, "At least 0."),
    }),
  });

  if (Object.keys(formik.errors).length === 0) {
    const { course, trueAirspeed, windDirection, windSpeed } = formik.values;
    handleFormInput(course, trueAirspeed, windDirection, windSpeed);
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
          id="trueAirspeed"
          isInvalid={
            !!formik.touched.trueAirspeed && !!formik.errors.trueAirspeed
          }
        >
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              True Airspeed
            </FormLabel>
            <FormErrorMessage fontSize="xs" textAlign="end" mt="0" mb="0.5">
              {formik.errors.trueAirspeed}
            </FormErrorMessage>
          </Flex>
          <Input
            type="number"
            value={formik.values.trueAirspeed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="sm"
            borderRadius="md"
            min={0}
          />
        </FormControl>
        <FormControl
          id="windDirection"
          isInvalid={
            !!formik.touched.windDirection && !!formik.errors.windDirection
          }
        >
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              Wind Direction
            </FormLabel>
            <FormErrorMessage fontSize="xs" textAlign="end" mt="0" mb="0.5">
              {formik.errors.windDirection}
            </FormErrorMessage>
          </Flex>
          <Input
            type="number"
            value={formik.values.windDirection}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="sm"
            borderRadius="md"
            min={0}
            max={360}
          />
        </FormControl>
        <FormControl
          id="windSpeed"
          isInvalid={!!formik.touched.windSpeed && !!formik.errors.windSpeed}
        >
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              Wind Speed
            </FormLabel>
            <FormErrorMessage fontSize="xs" textAlign="end" mt="0" mb="0.5">
              {formik.errors.windSpeed}
            </FormErrorMessage>
          </Flex>
          <Input
            type="number"
            value={formik.values.windSpeed}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            size="sm"
            borderRadius="md"
            min={0}
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
            value={Math.round(correctionData.heading)}
            size="sm"
            disabled
            borderRadius="md"
          />
        </FormControl>
        <FormControl id="groundSpeed">
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              Ground Speed
            </FormLabel>
          </Flex>
          <Input
            type="number"
            value={Math.round(correctionData.groundSpeed)}
            size="sm"
            disabled
            borderRadius="md"
          />
        </FormControl>
        <FormControl id="windCorrectionAngle">
          <Flex justifyContent="space-between">
            <FormLabel fontSize="sm" mb="0.5">
              Wind Correction Angle
            </FormLabel>
          </Flex>
          <Input
            value={
              (Math.round(correctionData.windCorrectionAngle) <= 0 ? "" : "+") +
              Math.round(correctionData.windCorrectionAngle)
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
