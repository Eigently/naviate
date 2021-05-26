/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { lighten, mix, readableColor } from "polished";
import { useFormik } from "formik";

import * as Yup from "yup";

import { ThemeObject } from "../../theme/interface";

import { E6BData } from "../interface";

type FormProps = {
  theme_object: ThemeObject;
  correction_data: E6BData;
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

  const labelWarningStyle = [
    css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    `,
  ];

  const labelStyle = [
    css`
      margin-top: 0.75rem;
      margin-bottom: 0.1rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: ${readableColor(theme_object.colors.background)};
    `,
  ];

  const warningStyle = [
    css`
      font-weight: 500;
      font-size: 0.8rem;
      margin-bottom: 0.1rem;
      color: ${lighten(0.05, theme_object.colors.naviate_red)};
    `,
  ];

  const dataEntryStyle = [
    css`
      border-radius: 0.25rem;
      border: solid 0.2rem
        ${mix(0.8, theme_object.colors.background, theme_object.colors.base)};
      color: ${readableColor(theme_object.colors.background)};
      padding: 0.25rem 0.5rem;
    `,
  ];

  const calculatedStyle = [
    dataEntryStyle,
    css`
      background-color: ${mix(
        0.9,
        theme_object.colors.background,
        theme_object.colors.base
      )};
    `,
  ];

  const formInputStyle = [
    dataEntryStyle,
    css`
      background-color: ${lighten(0.02, theme_object.colors.background)};
    `,
  ];

  const formInputWarningStyle = [
    css`
      box-sizing: border-box;
      border: solid 0.2rem ${theme_object.colors.naviate_red};
    `,
  ];

  if (Object.keys(formik.errors).length === 0) {
    const { course, true_airspeed, wind_direction, wind_speed } = formik.values;
    handle_form_input(course, true_airspeed, wind_direction, wind_speed);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      css={[
        css`
          display: flex;
          grid-column: span 1 / span 1;
          flex-direction: column;
          flex-grow: 1;
          background-color: ${lighten(0.08, theme_object.colors.background)};
          padding: 1rem;
          border-radius: 0.2rem 0rem 0rem 0.2rem;
        `,
      ]}
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
      <div css={[labelWarningStyle]}>
        <label htmlFor="course" css={[labelStyle]}>
          Course
        </label>
        <div css={[warningStyle]}>
          {formik.touched.course &&
            formik.errors.course &&
            formik.errors.course}
        </div>
      </div>
      <input
        id="course"
        name="course"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.course}
        onBlur={formik.handleBlur}
        min={0}
        max={360}
        css={[
          formInputStyle,
          formik.touched.course &&
            formik.errors.course &&
            formInputWarningStyle,
        ]}
      />
      <div css={[labelWarningStyle]}>
        <label htmlFor="true_airspeed" css={[labelStyle]}>
          True Airspeed
        </label>
        <div css={[warningStyle]}>
          {formik.touched.true_airspeed &&
            formik.errors.true_airspeed &&
            formik.errors.true_airspeed}
        </div>
      </div>
      <input
        id="true_airspeed"
        name="true_airspeed"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.true_airspeed}
        onBlur={formik.handleBlur}
        min={0}
        css={[
          formInputStyle,
          formik.touched.true_airspeed &&
            formik.errors.true_airspeed &&
            formInputWarningStyle,
        ]}
      />
      <div css={[labelWarningStyle]}>
        <label htmlFor="wind_direction" css={[labelStyle]}>
          Wind Direction
        </label>
        <div css={[warningStyle]}>
          {formik.touched.wind_direction &&
            formik.errors.wind_direction &&
            formik.errors.wind_direction}
        </div>
      </div>
      <input
        id="wind_direction"
        name="wind_direction"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.wind_direction}
        onBlur={formik.handleBlur}
        min={0}
        max={360}
        css={[
          formInputStyle,
          formik.touched.wind_direction &&
            formik.errors.wind_direction &&
            formInputWarningStyle,
        ]}
      />
      <div css={[labelWarningStyle]}>
        <label htmlFor="wind_speed" css={[labelStyle]}>
          Wind Speed
        </label>

        <div css={[warningStyle]}>
          {formik.touched.wind_speed &&
            formik.errors.wind_speed &&
            formik.errors.wind_speed}
        </div>
      </div>
      <input
        id="wind_speed"
        name="wind_speed"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.wind_speed}
        onBlur={formik.handleBlur}
        min={0}
        css={[
          formInputStyle,
          formik.touched.wind_speed &&
            formik.errors.wind_speed &&
            formInputWarningStyle,
        ]}
      />
      <div css={[labelWarningStyle]}>
        <label htmlFor="heading" css={[labelStyle]}>
          Heading
        </label>
      </div>
      <input
        value={Math.round(correction_data.heading)}
        css={[calculatedStyle]}
        readOnly={true}
      />
      <div css={[labelWarningStyle]}>
        <label htmlFor="groundSpeed" css={[labelStyle]}>
          Ground Speed
        </label>
      </div>
      <input
        value={Math.round(correction_data.ground_speed)}
        css={[calculatedStyle]}
        readOnly={true}
      />
      <div css={[labelWarningStyle]}>
        <label htmlFor="windCorrectionAngle" css={[labelStyle]}>
          Wind Correction Angle
        </label>
      </div>
      <input
        value={
          (correction_data.wind_correction_angle <= 0 ? "" : "+") +
          Math.round(correction_data.wind_correction_angle)
        }
        css={[calculatedStyle]}
        readOnly={true}
      />
    </form>
  );
};
