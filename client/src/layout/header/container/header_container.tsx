import { FC } from "react";

import { Header } from "../components/header";

import { useAppDispatch, useAppSelector } from "../../../state/hooks";
import { select_theme_object } from "../../../theme/selectors/select_theme_object";
import { select_theme } from "../../../theme/selectors/select_theme";
import { toggle_theme } from "../../../theme/theme_slice";
import { useColorMode } from "@chakra-ui/react";

export const HeaderContainer: FC = () => {
  const dispatch = useAppDispatch();

  const theme = useAppSelector(select_theme);
  const theme_object = useAppSelector(select_theme_object);

  const { toggleColorMode } = useColorMode();

  return (
    <Header
      theme={theme}
      theme_object={theme_object}
      handle_toggle_theme={() => {
        dispatch(toggle_theme());
        toggleColorMode();
      }}
    />
  );
};
