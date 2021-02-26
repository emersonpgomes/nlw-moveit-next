import { useContext } from "react";
import { ChallengesContext } from "../contexts/challenges";
import styles from "../styles/components/profile.module.css";

export const Profile = () => {
  const { level } = useContext(ChallengesContext);
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/emersonpgomes.png" alt="" />
      <div>
        <strong>Emerson P. Gomes</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
};
