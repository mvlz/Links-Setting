import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import {
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
interface Social {
  id: number;
  type?: string;
  link?: string;
}
interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  onDelete: (id: number) => void;
  social: Social;
}
const ConfirmModal = ({
  isOpen,
  handleClose,
  onDelete,
  social,
}: ModalProps) => {
  const [isDisable, setIsDisable] = useState(true);

  const confirmHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value.toLowerCase() === "confirm") {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  };
  const { t } = useTranslation();
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t("confirmTitle")}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t("confirmText1")} <strong>{t(`${social.type}`)}</strong>{" "}
            {t("confirmText2")}
          </DialogContentText>
          <TextField
            fullWidth
            id="outlined-basic"
            label={t("confirmField")}
            variant="outlined"
            onChange={(e) => confirmHandler(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" size="small">
            {t("cBtn")}
          </Button>
          <Button
            disabled={isDisable}
            onClick={() => onDelete(social.id)}
            size="small"
            variant="contained"
          >
            {t("dBtn")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
