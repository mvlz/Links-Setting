import itemStyles from "../styles/SocialItem.module.css";
import { Button, Grid } from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "./ConfirmModal";
import { useTranslation } from "react-i18next";
import { Social } from "../ts/interfaces";
import SocialForm from "./SocialForm";
interface IProps {
  social: Social;
  setSocials: Dispatch<SetStateAction<Social[]>>;
  socials: Social[];
}

const SocialItem = ({ social, setSocials, socials }: IProps) => {
  const { type, link } = social;
  const [isOpen, setIsOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
  };
  const editHandler = (id: number): void => {
    setIsEdited(true);
  };
  const onDelete = (id: number) => {
    const cloneSocials = [...socials];
    const filteredsocials = cloneSocials.filter((s) => s.id !== id);
    setSocials(filteredsocials);
  };

  const { t } = useTranslation();

  return (
    <Grid
      className={itemStyles.itemWrapper}
      sx={{ bgcolor: "background.middle" }}
    >
      <div className={itemStyles.socialItem}>
        <div>
          <p>
            {t(`${type}`)} &nbsp; {t("linkField")}: {link}
          </p>
        </div>
        <div>
          <Button
            variant="text"
            color="error"
            size="small"
            onClick={handleOpen}
          >
            <DeleteIcon /> {t("dBtn")}
          </Button>
          <Button
            variant="text"
            size="small"
            onClick={() => editHandler(social.id)}
          >
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
      </div>
      {isEdited && (
        <SocialForm
          setIsOpen={setIsEdited}
          isEdited={isEdited}
          editedSocial={social}
          socials={socials}
          setSocials={setSocials}
        />
      )}
    </Grid>
  );
};

export default SocialItem;
