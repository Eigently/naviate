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
import { DAtisData, MetarData, TafData } from "../interface";

type AtisProps = {
  dAtisData: DAtisData;
  handleGetDAtis: (icaoCode: string) => void;
  metarData: MetarData;
  handleGetMetar: (station: string) => void;
  tafData: TafData;
  handleGetTaf: (station: string) => void;
};

export const Atis: FC<AtisProps> = ({
  dAtisData,
  handleGetDAtis,
  metarData,
  handleGetMetar,
  tafData,
  handleGetTaf,
}) => {
  const errorColor = useColorModeValue("red.500", "red.300");
  const spinnerColor = useColorModeValue("blue.700", "blue.300");

  const formik = useFormik({
    initialValues: {
      station: "",
    },
    onSubmit: (values) => {
      Promise.all([
        handleGetDAtis(values.station.toLocaleUpperCase()),
        handleGetMetar(values.station.toLocaleUpperCase()),
        handleGetTaf(values.station.toLocaleUpperCase()),
      ]);
    },
    validationSchema: Yup.object().shape({
      station: Yup.string().required("Required."),
    }),
  });

  const isLoading =
    dAtisData.status === "loading" ||
    metarData.status === "loading" ||
    tafData.status === "loading";

  const dAtisComponent = {
    status: dAtisData.status,
    component: (dAtisData.status === "loading" ||
      dAtisData.status === "succeeded" ||
      dAtisData.status === "failed") && (
      <Stack spacing="0.2rem">
        <Heading size="sm">D-ATIS</Heading>
        {dAtisData.status === "loading" && (
          <Skeleton borderRadius="md" height="2rem" />
        )}
        {dAtisData.status === "failed" && (
          <Text fontFamily="monospace" color={errorColor}>
            {dAtisData.error}
          </Text>
        )}
        {dAtisData.status === "succeeded" &&
          (dAtisData.data.dAtisType === "COMBINED" ? (
            <Text fontFamily="monospace">{dAtisData.data?.dAtisCombined}</Text>
          ) : (
            <>
              <Text fontFamily="monospace">{dAtisData.data?.dAtisArrival}</Text>
              <Text fontFamily="monospace">
                {dAtisData.data?.dAtisDeparture}
              </Text>
            </>
          ))}
      </Stack>
    ),
  };

  const metarComponent = {
    status: metarData.status,
    component: (metarData.status === "loading" ||
      metarData.status === "succeeded" ||
      metarData.status === "failed") && (
      <Stack spacing="0.2rem">
        <Heading size="sm">METAR</Heading>
        {metarData.status === "loading" && (
          <Skeleton borderRadius="md" height="4rem" />
        )}
        {metarData.status === "failed" && (
          <Text fontFamily="monospace" color={errorColor}>
            {metarData.error}
          </Text>
        )}
        {metarData.status === "succeeded" && (
          <Text fontFamily="monospace">{metarData.data?.metar}</Text>
        )}
      </Stack>
    ),
  };

  const tafComponent = {
    status: tafData.status,
    component: (tafData.status === "loading" ||
      tafData.status === "succeeded" ||
      tafData.status === "failed") && (
      <Stack spacing="0.4rem">
        <Heading size="sm">TAF</Heading>
        {tafData.status === "loading" && (
          <Skeleton borderRadius="md" height="4rem" />
        )}
        {tafData.status === "failed" && (
          <Text fontFamily="monospace" color={errorColor}>
            {tafData.error}
          </Text>
        )}
        {tafData.status === "succeeded" && (
          <Text fontFamily="monospace">{tafData.data?.taf}</Text>
        )}
      </Stack>
    ),
  };

  const resultComponentOrdering = [dAtisComponent, metarComponent, tafComponent]
    .filter(({ status }) => status === "succeeded")
    .map(({ component }) => component)
    .concat(
      [dAtisComponent, metarComponent, tafComponent]
        .filter(({ status }) => status === "loading")
        .map(({ component }) => component)
    )
    .concat(
      [dAtisComponent, metarComponent, tafComponent]
        .filter(({ status }) => status === "failed")
        .map(({ component }) => component)
    );

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
              id="station"
              isInvalid={!!formik.touched.station && !!formik.errors.station}
            >
              <Flex justifyContent="space-between">
                <FormLabel fontSize="sm" mb="0.5">
                  ICAO Code or Station
                </FormLabel>
                <FormErrorMessage fontSize="xs" textAlign="end" mt="0" mb="0.5">
                  {formik.errors.station}
                </FormErrorMessage>
              </Flex>
              <Input
                value={formik.values.station.toLocaleUpperCase()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="sm"
                borderRadius="md"
                disabled={isLoading}
              />
            </FormControl>
            <Button
              colorScheme="blue"
              disabled={isLoading}
              variant="outline"
              size="sm"
              borderRadius="md"
              type="submit"
              display="flex"
              alignItems="center"
            >
              <Box mt="1">Submit</Box>
              {isLoading && <Spinner color={spinnerColor} size="sm" ml="2" />}
            </Button>
          </Stack>
        </form>
      </Box>
      <Stack
        gridColumn="span 2 / span 2"
        m="4"
        overflowY="auto"
        height="12rem"
        spacing="1rem"
      >
        {resultComponentOrdering}
      </Stack>
    </Box>
  );
};
