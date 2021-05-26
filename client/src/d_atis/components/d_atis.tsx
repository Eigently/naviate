/** @jsxImportSource @emotion/react */
import * as t from "io-ts";
import { css } from "@emotion/react";
import { FC } from "react";
import { desaturate, lighten, readableColor } from "polished";
import * as Yup from "yup";

import { ThemeObject } from "../../theme/interface";

import { shadow } from "../../style/shadow";
import { mq } from "../../style/breakpoints";
import { useFormik } from "formik";
import { FormTextInput } from "../../form/form_text_input";
import { DAtisData } from "../interface";

type DAtisProps = {
  theme_object: t.TypeOf<typeof ThemeObject>;
  d_atis_data: DAtisData;
  handle_get_d_atis: (icao_code: string) => void;
};

export const DAtis: FC<DAtisProps> = ({
  theme_object,
  d_atis_data,
  handle_get_d_atis,
}) => {
  const styles = {
    grid: css`
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      ${mq.md} {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      background-color: ${lighten(0.05, theme_object.colors.background)};
      border-radius: 0.25rem;
      align-items: stretch;
    `,
    form_grid_item: css`
      grid-column: span 1 / span 1;
      border-radius: 0.25rem 0.25rem 0rem 0rem;
      ${mq.md} {
        border-radius: 0.25rem 0rem 0rem 0.25rem;
      }
    `,
    form_flex: css`
      display: flex;
      flex-direction: column;
      background-color: ${lighten(0.08, theme_object.colors.background)};
      padding: 1rem;
    `,
    content_flex: css`
      display: flex;
      flex-direction: column;
      grid-column: span 2 / span 2;
      padding: 1rem;
      /* margin-bottom: 1rem; */
      height: 300px;
      overflow-y: auto;
    `,
    heading: css`
      font-size: 1.5rem;
      font-weight: 300;
      color: ${theme_object.colors.base};
    `,
    d_atis_content: css`
      font-family: monospace;
      font-size: 0.9rem;
      color: ${theme_object.colors.base};
      padding-bottom: 1rem;
    `,
    error: css`
      color: ${theme_object.colors.naviate_red};
    `,
    submit: css`
      background-color: ${theme_object.colors.naviate_dark_blue};
      color: ${readableColor(theme_object.colors.naviate_dark_blue)};
      padding: 0.25rem;
      margin: 1rem 0rem 1rem 0rem;
      border-radius: 0.25rem;
      align-self: flex-end;
      min-width: 33.33%;
    `,
    submit_disabled: css`
      background-color: ${desaturate(
        0.7,
        theme_object.colors.naviate_dark_blue
      )};
    `,
  };

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
    <div css={[styles.grid, shadow.lg]}>
      <form
        css={[styles.form_grid_item, styles.form_flex]}
        onSubmit={formik.handleSubmit}
      >
        <h1 css={[styles.heading]}>ATIS</h1>
        <FormTextInput
          id="icao_code"
          label="ICAO Code"
          theme_object={theme_object}
          error={formik.touched.icao_code && formik.errors.icao_code}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.icao_code.toLocaleUpperCase()}
          input_props={{ type: "text" }}
        />
        <button
          type="submit"
          css={[
            styles.submit,
            d_atis_data.status === "loading" && styles.submit_disabled,
          ]}
          disabled={d_atis_data.status === "loading"}
        >
          Submit
        </button>
      </form>
      <div css={[styles.form_grid_item, styles.content_flex]}>
        {d_atis_data.status === "loading" && (
          <h1 css={[styles.heading]}>Loading...</h1>
        )}
        {d_atis_data.status === "succeeded" && (
          <>
            <h1 css={[styles.heading]}>{d_atis_data.data?.icao_code}</h1>
            {d_atis_data.data?.d_atis_type === "COMBINED" ? (
              <div css={[styles.d_atis_content]}>
                {d_atis_data.data?.d_atis_combined}
              </div>
            ) : (
              <>
                <div css={[styles.d_atis_content]}>
                  {d_atis_data.data?.d_atis_arrival}
                </div>
                <div css={[styles.d_atis_content]}>
                  {d_atis_data.data?.d_atis_departure}
                </div>
              </>
            )}
          </>
        )}
        {d_atis_data.status === "failed" && (
          <>
            <h1 css={[styles.heading, styles.error]}>Error</h1>
            <div css={[styles.error]}>{d_atis_data.error}</div>
          </>
        )}
      </div>
    </div>
  );
};
