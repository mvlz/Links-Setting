import React from "react";
import { create } from "jss";
import rtl from "jss-rtl";

import { StylesProvider, jssPreset, ThemeProvider } from "@mui/styles";
import i18n from "../localization/";
import { createTheme } from "@mui/material";
import { AppProps } from "next/app";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

function withRoot(Component: AppProps) {
  return function WithRoot(props: AppProps) {
    return (
      <StylesProvider jss={jss}>
        <ThemeProvider
          theme={createTheme({
            direction: i18n.dir(),
          })}
        >
          <Component {...props} />
        </ThemeProvider>
      </StylesProvider>
    );
  };
}

export default withRoot;
