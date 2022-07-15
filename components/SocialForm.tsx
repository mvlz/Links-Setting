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
const optionList = [
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
  const [option, setOption] = useState("");
  const [type, setType] = useState("");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSocial({ ...social, [e.target.name]: e.target.value });
  };
  const changeLinkHandler = (e: any): void => {
    onChangeHandler(e);
    setOption(e.target.value);
  };
  const changeTypeHandler = (e: any): void => {
    onChangeHandler(e);
    setType(e.target.value);
  };
  const clickHandler = (): void => {
    submitHandler();
    setOption("");
    setType("");
    setSocial({});
  };
  return (
    <Paper elevation={2}>
      <form className={formStyles.socialForm}>
        <p className={formStyles.title}>Add social</p>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="label">Link</InputLabel>
              <Select
                labelId="label"
                id="select"
                value={option}
                name="link"
                label="Link"
                onChange={(e) => changeLinkHandler(e)}
              >
                {optionList.map((option) => (
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
              onChange={(e) => changeTypeHandler(e)}
              name="type"
              value={type}
            />
          </Grid>
        </Grid>
        <div className={formStyles.formBottom}>
          <Button variant="contained" onClick={clickHandler}>
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
