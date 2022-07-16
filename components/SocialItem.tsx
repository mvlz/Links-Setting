import itemStyles from "../styles/SocialItem.module.css";
import { Button, Grid } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "./ConfirmModal";
import { useTranslation } from "react-i18next";
import { Social } from "../ts/interfaces";
interface IProps {
  social: Social;
  setSocials: Dispatch<SetStateAction<Social[]>>;
  socials: Social[];
}

const SocialItem = ({ social, setSocials, socials }: IProps) => {
  const { type, link } = social;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };
  const onDelete = (id: number) => {
    const cloneSocials = [...socials];
    const filteredsocials = cloneSocials.filter((s) => s.id !== id);
    setSocials(filteredsocials);
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
