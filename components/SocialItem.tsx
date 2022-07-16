import itemStyles from "../styles/SocialItem.module.css";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "./ConfirmModal";
import { useTranslation } from "react-i18next";
import { Social } from "../ts/interfaces";
interface IProps {
  social: Social;
  onDelete: (id: number) => void;
}

const SocialItem = ({ social, onDelete }: IProps) => {
  const { type, link } = social;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const { t } = useTranslation();

  return (
    <Grid
      sx={{ bgcolor: "background.middle" }}
      className={itemStyles.socialItem}
    >
      <div>
        <p>
          {t(`${type}`)} &nbsp; {t("linkField")}: {link}
        </p>
      </div>
      <div>
        <Button variant="text" color="error" size="small" onClick={handleOpen}>
          <DeleteIcon /> {t("dBtn")}
        </Button>
        <Button variant="text" size="small">
          <EditIcon /> {t("eBtn")}
        </Button>
      </div>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          handleClose={handleClose}
          onDelete={onDelete}
          social={social}
        />
      )}
    </Grid>
  );
};

export default SocialItem;
