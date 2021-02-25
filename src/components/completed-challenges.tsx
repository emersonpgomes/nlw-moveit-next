import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/challenges";
import styles from "../styles/components/completed-challenges.module.css";

export interface CompletedChallengesProps {}

export const CompletedChallenges = (props: CompletedChallengesProps) => {
  const { challengesCompleted } = useContext(ChallengesContext);
  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{challengesCompleted}</span>
    </div>
  );
};
