import React, { useContext } from "react";
import { CountdownContext } from "../contexts/countdown";
import styles from "../styles/components/countdown.module.css";

function getDigits(number: number) {
  return String(number).padStart(2, "0").split("");
}

export interface CountdownProps {}

export const Countdown = (props: CountdownProps) => {
  const {
    minutes,
    seconds,
    hasFinshed,
    isActive,
    resetCountdown,
    startCountdown,
  } = useContext(CountdownContext);

  const [minutesLeft, minutesRight] = getDigits(minutes);
  const [secondsLeft, secondsRight] = getDigits(seconds);

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
          Ciclo encerrado
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
