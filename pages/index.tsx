import { Button, Paper } from "@mui/material";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import SocialForm from "../components/SocialForm";
import SocialItem from "../components/SocialItem";
import { Trans, useTranslation } from "react-i18next";
import { Social } from "../ts/interfaces";

const Home: NextPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [socials, setSocials] = useState<Social[]>([]);
  const [social, setSocial] = useState<Social | null>(null);
  const submitHandler = () => {
    setSocials([...socials, { ...social, id: Date.now() }]);
  };
  const onDelete = (id: number) => {
    const cloneSocials = [...socials];
    const filteredsocials = cloneSocials.filter((s) => s.id !== id);
    setSocials(filteredsocials);
  };
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
      {isOpen && (
        <SocialForm
          setIsOpen={setIsOpen}
          setSocial={setSocial}
          social={social}
          submitHandler={submitHandler}
        />
      )}
      {socials &&
        socials.map((social) => {
          return (
            <SocialItem key={social.id} social={social} onDelete={onDelete} />
          );
        })}
    </Paper>
  );
};

export default Home;
