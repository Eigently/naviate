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
  Spinner,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import { DAtisData } from "../interface";

type DAtisProps = {
  dAtisData: DAtisData;
  handleGetDAtis: (icaoCode: string) => void;
};

export const DAtis: FC<DAtisProps> = ({ dAtisData, handleGetDAtis }) => {
  const errorColor = useColorModeValue("red.500", "red.300");
  const spinnerColor = useColorModeValue("blue.700", "blue.300");

  const formik = useFormik({
    initialValues: {
      icaoCode: "",
    },
    onSubmit: (values) => {
      handleGetDAtis(values.icaoCode.toLocaleUpperCase());
    },
    validationSchema: Yup.object().shape({
      icaoCode: Yup.string()
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
              id="icaoCode"
              isInvalid={!!formik.touched.icaoCode && !!formik.errors.icaoCode}
            >
              <Flex justifyContent="space-between">
                <FormLabel fontSize="sm" mb="0.5">
                  ICAO Code
                </FormLabel>
                <FormErrorMessage fontSize="xs" textAlign="end" mt="0" mb="0.5">
                  {formik.errors.icaoCode}
                </FormErrorMessage>
              </Flex>
              <Input
                value={formik.values.icaoCode.toLocaleUpperCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="sm"
                borderRadius="md"
                disabled={dAtisData.status === "loading"}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              disabled={dAtisData.status === "loading"}
              variant="outline"
              size="sm"
              borderRadius="md"
              type="submit"
              display="flex"
              alignItems="center"
            >
              <Box mt="1">Submit</Box>
              {dAtisData.status === "loading" && (
                <Spinner color={spinnerColor} size="sm" ml="2" />
              )}
            </Button>
          </Stack>
        </form>
      </Box>
      <Stack gridColumn="span 2 / span 2" m="4" overflowY="auto" height="12rem">
        {dAtisData.status === "loading" && (
          <>
            <Skeleton borderRadius="md">
              <Heading size="md">KBNA</Heading>
            </Skeleton>
            <Skeleton borderRadius="md" height="10rem" />
          </>
        )}
        {dAtisData.status === "succeeded" && (
          <>
            <Heading size="md">{dAtisData.data?.icaoCode}</Heading>
            {dAtisData.data?.dAtisType === "COMBINED" ? (
              <Text fontFamily="monospace">
                {dAtisData.data?.dAtisCombined}
              </Text>
            ) : (
              <>
                <Text fontFamily="monospace">
                  {dAtisData.data?.dAtisArrival}
                </Text>
                <Text fontFamily="monospace">
                  {dAtisData.data?.dAtisDeparture}
                </Text>
              </>
            )}
          </>
        )}
        {dAtisData.status === "failed" && (
          <>
            <Heading size="md" color={errorColor}>
              Error
            </Heading>
            <Text fontFamily="monospace" color={errorColor}>
              {dAtisData.error}
            </Text>
          </>
        )}
      </Stack>
    </Box>
  );
};
