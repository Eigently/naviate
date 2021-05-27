/** @jsxImportSource @emotion/react */
import * as t from "io-ts";
import { css } from "@emotion/react";
import { lighten, mix, readableColor } from "polished";
import { ChangeEventHandler, FC, FocusEventHandler } from "react";
import { ThemeObject } from "../theme/interface";

type FormTextInputProps = {
  theme_object: t.TypeOf<typeof ThemeObject>;
  id: string;
  label: string;
  onChange: ChangeEventHandler;
  value?: string | ReadonlyArray<string> | number;
  onBlur: FocusEventHandler;
  input_props?: any;
  error?: string | false;
  disabled?: boolean;
};

export const FormTextInput: FC<FormTextInputProps> = ({
  theme_object,
  id,
  label,
  onChange,
  value,
  onBlur,
  error,
  input_props = {},
  disabled = false,
}) => {
  const border_color = mix(
    0.9,
    theme_object.colors.background,
    theme_object.colors.base
  );
  const border_warning_color = theme_object.colors.naviate_red;
  const lightened_border_color = mix(
    0.8,
    border_color,
    theme_object.colors.base
  );
  const lightened_border_warning_color = lighten(0.2, border_warning_color);

  const styles = {
    label_warning_flex: css`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: flex-end;
    `,
    label: css`
      margin-top: 0.75rem;
      margin-bottom: 0.1rem;
      font-size: 0.8rem;
      font-weight: 600;
      color: ${readableColor(theme_object.colors.background)};
    `,
    warning: css`
      font-weight: 500;
      font-size: 0.8rem;
      margin-bottom: 0.1rem;
      color: ${lighten(0.05, theme_object.colors.naviate_red)};
    `,
    data_entry: css`
      border-radius: 0.25rem;
      border: solid 2px ${border_color};
      color: ${theme_object.colors.base};
      padding: 0.25rem 0.5rem;
      transition: border-color 0.5s, background-color 0.5s;
      &:hover,
      &:focus {
        border-color: ${lightened_border_color};
      }
    `,
    calculated: css`
      background-color: ${mix(
        0.9,
        theme_object.colors.background,
        theme_object.colors.base
      )};
    `,
    form_input: css`
      background-color: ${lighten(0.02, theme_object.colors.background)};
    `,
    form_input_warning: css`
      box-sizing: border-box;
      border-color: ${border_warning_color};
      &:hover,
      &:focus {
        border-color: ${lightened_border_warning_color};
      }
    `,
  };

  return (
    <>
      <div css={[styles.label_warning_flex]}>
        <label htmlFor={id} css={[styles.label]}>
          {label}
        </label>
        {error && <div css={[styles.warning]}>{error}</div>}
      </div>
      <input
        id={id}
        name={id}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
        css={[
          styles.data_entry,
          styles.form_input,
          disabled && styles.calculated,
          error && styles.form_input_warning,
        ]}
        disabled={disabled}
        {...input_props}
      />
    </>
  );
};
