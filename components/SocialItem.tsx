import itemStyles from "../styles/SocialItem.module.css";
import { Button } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "./ConfirmModal";

interface Social {
  id: number;
  type?: string;
  link?: string;
}
interface IProps {
  social: Social;
  onDelete: (id: number) => void;
}

const SocialItem = ({ social, onDelete }: IProps) => {
  const { id, type, link } = social;
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = (): void => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  return (
    <div className={itemStyles.socialItem}>
      <div>
        <p>
          {type} &nbsp; link: {link}
        </p>
      </div>
      <div>
        <Button variant="text" color="error" size="small" onClick={handleOpen}>
          <DeleteIcon /> DELETE
        </Button>
        <Button variant="text" size="small">
          <EditIcon /> EDIT
        </Button>
      </div>
      {isOpen && (
        <ConfirmModal
          isOpen={isOpen}
          handleClose={handleClose}
          onDelete={onDelete}
          id={id}
        />
      )}
    </div>
  );
};

export default SocialItem;
