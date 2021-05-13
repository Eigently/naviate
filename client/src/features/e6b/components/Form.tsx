/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { FC } from "react";
import { lighten, readableColor } from "polished";
import { useFormik } from "formik";

import * as Yup from "yup";
import * as E6BBackend from "naviate-e6b";

import { ThemeObject } from "../../theme/interface";

type FormProps = {
  themeObject: ThemeObject;
};

export const Form: FC<FormProps> = ({ themeObject }) => {
  const formik = useFormik({
    initialValues: {
      course: "",
      trueAirspeed: "",
      windDirection: "",
      windSpeed: "",
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
      windSpeed: Yup.number()
        .required("Required.")
        .max(360, "At most 360°.")
        .min(0, "At least 0°."),
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
      color: ${readableColor(themeObject.colors.background)};
    `,
  ];

  const warningStyle = [
    css`
      font-weight: 500;
      font-size: 0.8rem;
      margin-bottom: 0.1rem;
      color: ${lighten(0.05, themeObject.colors.naviateRed)};
    `,
  ];

  const formInputStyle = [
    css`
      border-radius: 0.25rem;
      color: ${readableColor(themeObject.colors.background)};
      padding: 0.25rem 0.5rem;
      background-color: ${lighten(0.02, themeObject.colors.background)};
      border: solid 0.2rem ${lighten(0.02, themeObject.colors.background)};
    `,
  ];

  const formInputWarningStyle = [
    css`
      box-sizing: border-box;
      border: solid 0.2rem ${themeObject.colors.naviateRed};
    `,
  ];

  if (Object.keys(formik.errors).length === 0) {
    const { course, trueAirspeed, windDirection, windSpeed } = formik.values;
    const res = E6BBackend.get_correction(
      parseFloat(course),
      parseFloat(trueAirspeed),
      parseFloat(windDirection),
      parseFloat(windSpeed)
    );
    console.log("Correction: ", res);
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      css={[
        css`
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          max-width: 25rem;
          background-color: ${lighten(0.08, themeObject.colors.background)};
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
        css={[
          formInputStyle,
          formik.touched.course &&
            formik.errors.course &&
            formInputWarningStyle,
        ]}
      />
      <div css={[labelWarningStyle]}>
        <label htmlFor="trueAirspeed" css={[labelStyle]}>
          True Airspeed
        </label>
        <div css={[warningStyle]}>
          {formik.touched.trueAirspeed &&
            formik.errors.trueAirspeed &&
            formik.errors.trueAirspeed}
        </div>
      </div>
      <input
        id="trueAirspeed"
        name="trueAirspeed"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.trueAirspeed}
        onBlur={formik.handleBlur}
        css={[
          formInputStyle,
          formik.touched.trueAirspeed &&
            formik.errors.trueAirspeed &&
            formInputWarningStyle,
        ]}
      />
      <div css={[labelWarningStyle]}>
        <label htmlFor="windDirection" css={[labelStyle]}>
          Wind Direction
        </label>
        <div css={[warningStyle]}>
          {formik.touched.windDirection &&
            formik.errors.windDirection &&
            formik.errors.windDirection}
        </div>
      </div>
      <input
        id="windDirection"
        name="windDirection"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.windDirection}
        onBlur={formik.handleBlur}
        css={[
          formInputStyle,
          formik.touched.windDirection &&
            formik.errors.windDirection &&
            formInputWarningStyle,
        ]}
      />
      <div css={[labelWarningStyle]}>
        <label htmlFor="windSpeed" css={[labelStyle]}>
          Wind Speed
        </label>

        <div css={[warningStyle]}>
          {formik.touched.windSpeed &&
            formik.errors.windSpeed &&
            formik.errors.windSpeed}
        </div>
      </div>
      <input
        id="windSpeed"
        name="windSpeed"
        type="number"
        onChange={formik.handleChange}
        value={formik.values.windSpeed}
        onBlur={formik.handleBlur}
        css={[
          formInputStyle,
          formik.touched.windSpeed &&
            formik.errors.windSpeed &&
            formInputWarningStyle,
        ]}
      />
    </form>
  );
};
