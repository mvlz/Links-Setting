import itemStyles from "../styles/SocialItem.module.css";
import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "./ConfirmModal";
import { useTranslation } from "react-i18next";
import { Social } from "../ts/interfaces";
import SocialForm from "./SocialForm";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
} from "react-query";
interface IProps {
  social: Social;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const SocialItem = ({ social, refetch }: IProps) => {
  const { type, link } = social;
  const [isOpen, setIsOpen] = useState(false);
  const [isEdited, setIsEdited] = useState(false);

  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = (): void => {
    setIsOpen(false);
    refetch();
  };
  const editHandler = (): void => {
    setIsEdited(true);
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
          <Button variant="text" size="small" onClick={editHandler}>
            <EditIcon /> {t("eBtn")}
          </Button>
        </div>
        {isOpen && (
          <ConfirmModal
            isOpen={isOpen}
            handleClose={handleClose}
            social={social}
          />
        )}
      </div>
      {isEdited && (
        <SocialForm
          setIsOpen={setIsEdited}
          isEdited={isEdited}
          editedSocial={social}
          refetch={refetch}
        />
      )}
    </Grid>
  );
};

export default SocialItem;
