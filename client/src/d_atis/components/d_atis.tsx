/** @jsxImportSource @emotion/react */
import { FC } from "react";
import * as Yup from "yup";
import {
  Box,
  Stack,
  Button,
  Input,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Skeleton,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import { DAtisData } from "../interface";

type DAtisProps = {
  d_atis_data: DAtisData;
  handle_get_d_atis: (icao_code: string) => void;
};

export const DAtis: FC<DAtisProps> = ({ d_atis_data, handle_get_d_atis }) => {
  const error_color = useColorModeValue("red.500", "red.300");

  const formik = useFormik({
    initialValues: {
      icao_code: "",
    },
    onSubmit: (values) => {
      handle_get_d_atis(values.icao_code.toLocaleUpperCase());
    },
    validationSchema: Yup.object().shape({
      icao_code: Yup.string()
        .length(4, "Must be 4 characters.")
        .required("Required."),
    }),
  });

  return (
    <Box
      display="grid"
      gridTemplateColumns={{ base: "repeat(1, 1fr)", md: "repeat(3, 1fr)" }}
      borderWidth="1px"
      borderRadius="md"
      shadow="md"
      alignItems="stretch"
    >
      <Box
        borderRightWidth={{ md: "1px" }}
        borderBottomWidth={{ base: "1px", md: "0px" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing="4" m="4">
            <Heading size="lg">ATIS</Heading>
            <FormControl
              id="icao_code"
              isInvalid={
                !!formik.touched.icao_code && !!formik.errors.icao_code
              }
            >
              <Flex justifyContent="space-between">
                <FormLabel fontSize="sm" mb="0.5">
                  ICAO Code
                </FormLabel>
                <FormErrorMessage fontSize="xs" textAlign="end" mt="0" mb="0.5">
                  {formik.errors.icao_code}
                </FormErrorMessage>
              </Flex>
              <Input
                value={formik.values.icao_code.toLocaleUpperCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="sm"
                borderRadius="md"
                disabled={d_atis_data.status === "loading"}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              disabled={d_atis_data.status === "loading"}
              variant="outline"
              size="sm"
              borderRadius="md"
              type="submit"
            >
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
      <Stack
        gridColumn="span 2 / span 2"
        m="4"
        overflow="scroll"
        height="12rem"
      >
        {d_atis_data.status === "loading" && (
          <>
            <Skeleton borderRadius="md">
              <Heading size="md">KBNA</Heading>
            </Skeleton>
            <Skeleton borderRadius="md" height="10rem" />
          </>
        )}
        {d_atis_data.status === "succeeded" && (
          <>
            <Heading size="md">{d_atis_data.data?.icao_code}</Heading>
            {d_atis_data.data?.d_atis_type === "COMBINED" ? (
              <Text fontFamily="monospace">
                {d_atis_data.data?.d_atis_combined}
              </Text>
            ) : (
              <>
                <Text fontFamily="monospace">
                  {d_atis_data.data?.d_atis_arrival}
                </Text>
                <Text fontFamily="monospace">
                  {d_atis_data.data?.d_atis_departure}
                </Text>
              </>
            )}
          </>
        )}
        {d_atis_data.status === "failed" && (
          <>
            <Heading size="md" color={error_color}>
              Error
            </Heading>
            <Text fontFamily="monospace" color={error_color}>
              {d_atis_data.error}
            </Text>
          </>
        )}
      </Stack>
    </Box>
  );
};
