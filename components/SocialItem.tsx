import itemStyles from "../styles/SocialItem.module.css";
import { Button, Paper } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface Social {
  id: number;
  type?: string;
  link?: string;
}

const SocialItem = ({ id, type, link }: Social) => {
  return (
    <div className={itemStyles.socialItem}>
      <div>
        <p>
          {type} &nbsp; link: {link}
        </p>
      </div>
      <div>
        <Button variant="text" color="error" size="small">
          <DeleteIcon /> DELETE
        </Button>
        <Button variant="text" size="small">
          <EditIcon /> EDIT
        </Button>
      </div>
    </div>
  );
};

export default SocialItem;
