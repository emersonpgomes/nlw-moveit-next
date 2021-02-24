import React from 'react';
import styles from '../styles/components/completed-challenges.module.css';

export interface CompletedChallengesProps {}

export const CompletedChallenges = (props: CompletedChallengesProps) => (
  <div className={styles.completedChallengesContainer}>
    <span>Desafios completos</span>
    <span>5</span>
  </div>
);
