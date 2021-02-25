import React, { useContext, useEffect, useState } from "react";
import { ChallengesContext } from "../contexts/challenges";
import styles from "../styles/components/countdown.module.css";

const defaultTime = 0.1 * 60;

let countdownTimeout: NodeJS.Timeout;

function getDigits(number: number) {
  return String(number).padStart(2, "0").split("");
}

export interface CountdownProps {}

export const Countdown = (props: CountdownProps) => {
  const [time, setTime] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinshed, setHasFinished] = useState(false);
  const { startNewChallenge } = useContext(ChallengesContext);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutesLeft, minutesRight] = getDigits(minutes);
  const [secondsLeft, secondsRight] = getDigits(seconds);

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout);
    setIsActive(false);
    setTime(defaultTime);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }
  }, [isActive, time]);

  return (
    <>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minutesLeft}</span>
          <span>{minutesRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondsLeft}</span>
          <span>{secondsRight}</span>
        </div>
      </div>

      {hasFinshed ? (
        <button
          disabled
          type="button"
          className={`${styles.countdownButton} ${styles.countdownButtonSuccess}`}
        >
          Ciclo encerrado <img src="icons/level.svg" alt="" />
        </button>
      ) : (
        <>
          {isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo
            </button>
          )}
        </>
      )}
    </>
  );
};
