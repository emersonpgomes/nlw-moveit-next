import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/challenges";
import { CountdownContext } from "../contexts/countdown";
import styles from "../styles/components/challenge-box.module.css";

export interface ChallengeBoxProps {}

export const ChallengeBox = (props: ChallengeBoxProps) => {
  const { resetCountdown } = useContext(CountdownContext);
  const { activeChallenge, resetChallenge, completeChallenge } = useContext(
    ChallengesContext
  );

  function handleChallengeSucceeded() {
    resetCountdown();
    completeChallenge();
  }

  function handleChallengeFailed() {
    resetCountdown();
    resetChallenge();
  }

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>
          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>
          <footer>
            <button
              type="button"
              className={styles.challengeFailedButton}
              onClick={handleChallengeFailed}
            >
              Falhei
            </button>
            <button
              type="button"
              className={styles.challengeSucceededButton}
              onClick={handleChallengeSucceeded}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
        <div className={styles.challengeNotActive}>
          <strong>Finalize um ciclo para receber um desafio</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            Avance de level completando desafios.
          </p>
        </div>
      )}
    </div>
  );
};
