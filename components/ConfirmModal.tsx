import modalStyles from "../styles/ConfirmModal.module.css";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import { Button, TextField } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Social } from "../ts/interfaces";
import { deleteData } from "../services/CRUDServices";
interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  social: Social;
}
const ConfirmModal = ({ isOpen, handleClose, social }: ModalProps) => {
  const [isDisable, setIsDisable] = useState(true);
  const { t } = useTranslation();
  const confirmHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value === `${t("confirmField")}`) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };
  const deleteHandler = async () => {
    try {
      await deleteData(social.id);
      handleClose();
    } catch (error) {}
  };
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={modalStyles.wrapper}>
          <p className={modalStyles.title}>{t("confirmTitle")}</p>
          <p id="alert-dialog-description" className={modalStyles.text}>
            {t("confirmText1")} <strong>{t(`${social.type}`)}</strong>{" "}
            {t("confirmText2")}
          </p>
          <TextField
            fullWidth
            id="outlined-basic"
            label={t("confirmField")}
            variant="outlined"
            onChange={(e) => confirmHandler(e)}
          />
          <div className={modalStyles.buttonContainer}>
            <Button onClick={handleClose} variant="outlined" size="small">
              {t("cBtn")}
            </Button>
            <Button
              disabled={isDisable}
              onClick={deleteHandler}
              size="small"
              variant="contained"
            >
              {t("dBtn")}
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
