import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import LanguageSharpIcon from "@mui/icons-material/LanguageSharp";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
const currencies = [
  {
    value: "instagram",
    label: "instagram",
  },
  {
    value: "telegram",
    label: "telegram",
  },
  {
    value: "tweeter",
    label: "tweeter",
  },
  {
    value: "facebook",
    label: "facebook",
  },
  {
    value: "website",
    label: "website",
  },
  {
    value: "linkedin",
    label: "linkedin",
  },
];
const SocialForm: React.FunctionComponent<{
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSocial: Dispatch<SetStateAction<object>>;
  social: {};
  submitHandler: () => void;
}> = ({ setIsOpen, setSocial, social, submitHandler }) => {
  const [currency, setCurrency] = React.useState("instagram");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocial({ ...social, [e.target.name]: e.target.value });
  };
  const changeHandler = (e) => {
    onChangeHandler(e);
    setCurrency(e.target.value);
  };
  return (
    <div>
      <form>
        <TextField
          id="outlined-basic"
          label="type"
          variant="outlined"
          onChange={(e) => onChangeHandler(e)}
          name="type"
        />
        <FormControl fullWidth>
          <InputLabel id="label" onChange={(e) => onChangeHandler(e)}>
            Link
          </InputLabel>
          <Select
            labelId="label"
            id="select"
            value={currency}
            name="link"
            onChange={(e) => changeHandler(e)}
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={submitHandler}>
          Add
        </Button>
        <Button variant="outlined" onClick={() => setIsOpen(false)}>
          cancel
        </Button>
      </form>
    </div>
  );
};

export default SocialForm;
