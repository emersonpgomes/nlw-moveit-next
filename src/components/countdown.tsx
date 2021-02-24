import React, { useEffect, useState } from "react";
import styles from "../styles/components/countdown.module.css";

function getDigits(number: number) {
  return String(number).padStart(2, "0").split("");
}

export interface CountdownProps {}

export const Countdown = (props: CountdownProps) => {
  const [time, setTime] = useState(25 * 60);
  const [active, setActive] = useState(false);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const [minutesLeft, minutesRight] = getDigits(minutes);
  const [secondsLeft, secondsRight] = getDigits(seconds);

  function startOrStopCountdown() {
    setActive(isActive => !isActive);
  }

  useEffect(() => {
    if (active && time > 0) {
      setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
  }, [active, time]);

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
      <button
        type="button"
        className={styles.countdownButton}
        onClick={startOrStopCountdown}
      >
        {active ? 'Pausar' : 'Iniciar um ciclo'}
      </button>
    </>
  );
};
