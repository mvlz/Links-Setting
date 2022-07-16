import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { PaletteMode } from "@mui/material";
import { grey } from "@mui/material/colors";
import withRoot from "./withRoot";
import { useTranslation } from "react-i18next";
import Layout from "../components/Layout";

const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    mode,
    primary: {
      main: "#FFA82E",
    },
    ...(mode === "dark"
      ? {
          background: {
            default: "#161B25",
            paper: "#212b35",
            middle: "#3e4751",
          },
        }
      : {
          background: {
            middle: "#f4f6f8",
          },
        }),
    text: {
      ...(mode === "light"
        ? {
            primary: grey[900],
            secondary: grey[800],
          }
        : {
            primary: "#fff",
            secondary: grey[500],
          }),
    },
  },
});
const darkModeTheme = createTheme(getDesignTokens("dark"));
const lightModeTheme = createTheme(getDesignTokens("light"));

function getActiveTheme(themeMode: "light" | "dark") {
  return themeMode === "light" ? lightModeTheme : darkModeTheme;
}
function MyApp({ Component, pageProps }: AppProps) {
  const [activeTheme, setActiveTheme] = useState(lightModeTheme);
  const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");
  const { i18n } = useTranslation();

  let dir = i18n.dir();
  let lang = i18n.language;

  useEffect(() => {
    document.querySelector("html").setAttribute("dir", dir);
    document.querySelector("html").setAttribute("lang", lang);
  }, [lang, dir]);

  const toggleTheme: React.MouseEventHandler<HTMLButtonElement> = () => {
    const desiredTheme = selectedTheme === "light" ? "dark" : "light";

    setSelectedTheme(desiredTheme);
  };
  useEffect(() => {
    setActiveTheme(getActiveTheme(selectedTheme));
  }, [selectedTheme]);

  return (
    <ThemeProvider theme={activeTheme}>
      <Layout toggleTheme={toggleTheme}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
export default withRoot(MyApp);
