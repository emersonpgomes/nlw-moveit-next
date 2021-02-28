import { useContext } from "react";
import { ChallengesContext } from "../contexts/challenges";
import { UserContext } from "../contexts/user";
import styles from "../styles/components/profile.module.css";

export const Profile = () => {
  const { user } = useContext(UserContext);
  const { level } = useContext(ChallengesContext);

  return (
    <div className={styles.profileContainer}>
      <img src={user.avatarUrl} alt={`Foto do perfil de ${user.name}`} />
      <div>
        <strong>{user.name}</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
};
