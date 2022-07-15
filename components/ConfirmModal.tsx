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
interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  onDelete: (id: number) => void;
  id: number;
}
const ConfirmModal = ({ isOpen, handleClose, onDelete, id }: ModalProps) => {
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
  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`For delete social linkedin please fill "Confirm".`}
          </DialogContentText>
          <TextField
            fullWidth
            id="outlined-basic"
            label="Confirm"
            variant="outlined"
            onChange={(e) => confirmHandler(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" size="small">
            Cancel
          </Button>
          <Button
            disabled={isDisable}
            onClick={() => onDelete(id)}
            size="small"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmModal;
