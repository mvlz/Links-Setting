import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";
import { addNewData } from "../services/CRUDServices";
import formStyles from "../styles/SocialForm.module.css";
import { Social } from "../ts/interfaces";
import { optionList } from "../utils/socialsList";

interface FormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  setSocials: Dispatch<SetStateAction<Social[]>>;
  socials: Social[];
}
const SocialForm: React.FunctionComponent<FormProps> = ({
  setIsOpen,
  setSocials,
  socials,
}) => {
  const [option, setOption] = useState("");
  const [type, setType] = useState("");
  const [social, setSocial] = useState<Social | null>(null);

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
  const submitHandler = () => {
    setSocials([...socials, { ...social, id: Date.now() }]);
    addCommentHandler(social);
    setIsOpen(false);
  };
  const clickHandler = (): void => {
    submitHandler();
    setOption("");
    setType("");
    setSocial(null);
  };
  const { t } = useTranslation();

  const addCommentHandler = async (social: Social) => {
    try {
      await addNewData(social);
    } catch (error) {}
  };
  return (
    <Container
      sx={{ bgcolor: "background.middle" }}
      className={formStyles.formWrapper}
    >
      <form className={formStyles.socialForm}>
        <p className={formStyles.title}>{t("hBtn")}</p>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="label">{t("typeField")}</InputLabel>
              <Select
                labelId="label"
                id="select"
                value={type}
                name="type"
                label="Type"
                onChange={(e) => changeTypeHandler(e)}
              >
                {optionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {t(`${option.label}`)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="outlined-basic"
              label={t("linkField")}
              variant="outlined"
              onChange={(e) => changeLinkHandler(e)}
              name="link"
              value={option}
            />
          </Grid>
        </Grid>
        <div className={formStyles.formBottom}>
          <Button variant="contained" onClick={clickHandler}>
            {t("sBtn")}
          </Button>
          <Button variant="outlined" onClick={() => setIsOpen(false)}>
            {t("cBtn")}
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default SocialForm;
