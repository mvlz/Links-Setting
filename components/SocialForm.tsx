import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import formStyles from "../styles/SocialForm.module.css";
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
    <Paper elevation={2}>
      <form className={formStyles.socialForm}>
        <p className={formStyles.title}>Add social</p>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
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
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="type"
              variant="outlined"
              onChange={(e) => onChangeHandler(e)}
              name="type"
            />
          </Grid>
        </Grid>
        <div className={formStyles.formBottom}>
          <Button variant="contained" onClick={submitHandler}>
            Add
          </Button>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            cancel
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default SocialForm;
