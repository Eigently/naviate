/** @jsxImportSource @emotion/react */
import * as t from "io-ts";
import { css } from "@emotion/react";
import { FC } from "react";
import { lighten } from "polished";
import { useFormik } from "formik";

import * as Yup from "yup";

import { ThemeObject } from "../../theme/interface";

import { E6BData } from "../interface";
import { FormTextInput } from "../../form/form_text_input";

type FormProps = {
  theme_object: t.TypeOf<typeof ThemeObject>;
  correction_data: t.TypeOf<typeof E6BData>;
  handle_form_input: (
    course: number,
    true_airspeed: number,
    wind_direction: number,
    wind_speed: number
  ) => void;
};

export const E6BForm: FC<FormProps> = ({
  theme_object,
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

  const styles = {
    form_grid_item: css`
      grid-column: span 1 / span 1;
    `,
    form_flex: css`
      display: grid;
      grid-template-columns: 100%;
      background-color: ${lighten(0.08, theme_object.colors.background)};
      padding: 1rem;
    `,
  };

  if (Object.keys(formik.errors).length === 0) {
    const { course, true_airspeed, wind_direction, wind_speed } = formik.values;
    handle_form_input(course, true_airspeed, wind_direction, wind_speed);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      css={[styles.form_grid_item, styles.form_flex]}
    >
      <h1
        css={[
          css`
            font-size: 1.5rem;
            font-weight: 300;
            color: ${theme_object.colors.base};
          `,
        ]}
      >
        E6B Calculator
      </h1>
      <FormTextInput
        id="course"
        label="Course"
        theme_object={theme_object}
        error={formik.touched.course && formik.errors.course}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.course}
        input_props={{ min: 0, max: 360, type: "number" }}
      />
      <FormTextInput
        id="true_airspeed"
        label="True Airspeed"
        theme_object={theme_object}
        error={formik.touched.true_airspeed && formik.errors.true_airspeed}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.true_airspeed}
        input_props={{ min: 0, type: "number" }}
      />
      <FormTextInput
        id="wind_direction"
        label="Wind Direction"
        theme_object={theme_object}
        error={formik.touched.wind_direction && formik.errors.wind_direction}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.wind_direction}
        input_props={{ min: 0, type: "number" }}
      />
      <FormTextInput
        id="wind_speed"
        label="Wind Speed"
        theme_object={theme_object}
        error={formik.touched.wind_speed && formik.errors.wind_speed}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.wind_speed}
        input_props={{ min: 0, type: "number" }}
      />
      <FormTextInput
        id="heading"
        label="Heading"
        theme_object={theme_object}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={Math.round(correction_data.heading)}
        disabled
      />
      <FormTextInput
        id="ground_speed"
        label="Ground Speed"
        theme_object={theme_object}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={Math.round(correction_data.ground_speed)}
        disabled
      />
      <FormTextInput
        id="wind_correction_angle"
        label="Wind Correction Angle"
        theme_object={theme_object}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={
          (Math.round(correction_data.wind_correction_angle) <= 0 ? "" : "+") +
          Math.round(correction_data.wind_correction_angle)
        }
        disabled
      />
    </form>
  );
};
