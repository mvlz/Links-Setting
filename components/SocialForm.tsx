import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import { addNewData, updateData } from "../services/CRUDServices";
import formStyles from "../styles/SocialForm.module.css";
import { Social } from "../ts/interfaces";
import { optionList } from "../utils/socialsList";
import * as Yup from "yup";
import { useFormik } from "formik";

interface FormProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isEdited?: boolean;
  editedSocial?: Social;
  refetch: <TPageData>(
    options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}
const SocialForm: React.FunctionComponent<FormProps> = ({
  setIsOpen,
  isEdited,
  editedSocial,
  refetch,
}) => {
  const [social, setSocial] = useState<Social | null>(null);
  const { t } = useTranslation();

  const initialValues = {
    type: "",
    link: "",
  };
  const validationSchema = Yup.object({
    type: Yup.string().required(`${t("requiredField")}`),
    link: Yup.string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        `${t("validation")}`
      )
      .required(`${t("requiredField")}`),
  });

  const formik = useFormik({
    initialValues,
    submitHandler,
    validationSchema,
    validateOnMount: true,
  });
  const submitHandler = () => {
    if (!isEdited) {
      AddSocialAPI(social);
    } else {
      updateSocial(editedSocial?.id, {
        type: formik.values.type,
        link: formik.values.link,
      });
    }
    setIsOpen(false);
  };
  const clickHandler = (): void => {
    submitHandler();
    setSocial(null);
  };

  const AddSocialAPI = async (social: Social) => {
    const { data } = await addNewData(social);
    refetch();
    return data;
  };
  const updateSocial = async (id: number, item: Social) => {
    const { data } = await updateData(id, item);
    refetch();
    return data;
  };
  useEffect(() => {
    setSocial({
      type: formik.values.type,
      link: formik.values.link,
      id: Date.now(),
    });
  }, [formik.values.type, formik.values.link]);

  return (
    <Container
      sx={{ bgcolor: "background.middle" }}
      className={formStyles.formWrapper}
    >
      <form className={formStyles.socialForm}>
        <p className={formStyles.title}>
          {isEdited
            ? `${t("editTitle")} ${t(`${editedSocial?.type}`)}`
            : t("sBtn")}
        </p>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel id="label">{t("typeField")}</InputLabel>

              <Select
                labelId="label"
                id="select"
                label="Type"
                error={formik.touched.type && !!formik.errors.type}
                {...formik.getFieldProps("type")}
              >
                {optionList.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {t(`${option.label}`)}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText className={formStyles.error}>
                {formik.errors.type &&
                  formik.touched.type &&
                  `${formik.errors.type}`}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              id="outlined-basic"
              label={t("linkField")}
              variant="outlined"
              error={formik.touched.link && !!formik.errors.link}
              {...formik.getFieldProps("link")}
            />
            <FormHelperText className={formStyles.error}>
              {formik.errors.link &&
                formik.touched.link &&
                `${formik.errors.link}`}
            </FormHelperText>
          </Grid>
        </Grid>
        <div className={formStyles.formBottom}>
          <Button variant="contained" onClick={clickHandler}>
            {isEdited
              ? `${t("editTitle")} ${t(`${editedSocial?.type}`)}`
              : t("sBtn")}
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
