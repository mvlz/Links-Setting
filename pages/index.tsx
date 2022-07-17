import { Button, CircularProgress, Paper } from "@mui/material";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import SocialForm from "../components/SocialForm";
import SocialItem from "../components/SocialItem";
import { Trans, useTranslation } from "react-i18next";
import { Social } from "../ts/interfaces";
import { getAllData } from "../services/CRUDServices";
import { useQuery } from "react-query";

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const fetchSocials = async () => {
    const { data } = await getAllData();
    return data;
  };
  const { isLoading, error, data, refetch } = useQuery(
    "socialsData",
    fetchSocials
  );
  const { t } = useTranslation();

  return (
    <Paper elevation={2} className={styles.mainBox}>
      <p className={styles.title}> {t("title")}</p>
      <Button
        variant="text"
        size="small"
        disabled={isOpen}
        onClick={() => setIsOpen(true)}
      >
        <AddIcon />
        <Trans i18nKey="hBtn">trans</Trans>
      </Button>
      {isOpen && <SocialForm setIsOpen={setIsOpen} refetch={refetch} />}
      {isLoading ? (
        <CircularProgress className={styles.loading} />
      ) : error ? (
        <h4 className={styles.error}>{error?.message}</h4>
      ) : (
        data &&
        data.map((social: Social) => {
          return (
            <SocialItem key={social.id} social={social} refetch={refetch} />
          );
        })
      )}
    </Paper>
  );
};

export default Home;
