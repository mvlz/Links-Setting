import navbarStyles from "../styles/Navbar.module.css";
import { Button, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import LightModeIcon from "@mui/icons-material/LightMode";
import NightsStayIcon from "@mui/icons-material/NightsStay";
type NavProps = {
  toggleTheme?: React.MouseEventHandler<HTMLButtonElement>;
};
const Navbar = (props: NavProps) => {
  const { i18n, t } = useTranslation();
  const { palette } = useTheme();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  return (
    <nav className={navbarStyles.navbar}>
      <h6 className={navbarStyles.title}>{t("userSetting")}</h6>
      <div className={navbarStyles.buttonContainer}>
        <Button onClick={props.toggleTheme} color={"info"}>
          {palette.mode === "dark" ? (
            <NightsStayIcon color="disabled" />
          ) : (
            <LightModeIcon color="primary" />
          )}
        </Button>
        <Button
          variant="text"
          disabled={i18n.language === "fa" ? true : false}
          onClick={() => changeLanguage("fa")}
        >
          فارسی
        </Button>
        <Button
          variant="text"
          disabled={i18n.language === "en" ? true : false}
          onClick={() => changeLanguage("en")}
        >
          English
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
