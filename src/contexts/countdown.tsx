import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { ChallengesContext } from "./challenges";

const defaultTime = 25 * 60;

export interface CountdownContextData {
  minutes: number;
  seconds: number;
  isActive: boolean;
  hasFinshed: boolean;
  startCountdown(): void;
  resetCountdown(): void;
}

export const CountdownContext = createContext({} as CountdownContextData);

export interface CountdownProviderProps {
  children: ReactNode;
}

export const CountdownProvider = ({ children }: CountdownProviderProps) => {
  const countdownTimeout = useRef<NodeJS.Timeout>();
  const [time, setTime] = useState(defaultTime);
  const [isActive, setIsActive] = useState(false);
  const [hasFinshed, setHasFinished] = useState(false);
  const { startNewChallenge } = useContext(ChallengesContext);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  function startCountdown() {
    setIsActive(true);
  }

  function resetCountdown() {
    clearTimeout(countdownTimeout.current);
    setIsActive(false);
    setHasFinished(false);
    setTime(defaultTime);
  }

  useEffect(() => {
    if (isActive && time > 0) {
      countdownTimeout.current = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    } else if (isActive && time === 0) {
      setHasFinished(true);
      setIsActive(false);
      startNewChallenge();
    }

    return () => {
      clearTimeout(countdownTimeout.current);
    };
  }, [isActive, time]);

  return (
    <CountdownContext.Provider
      value={{
        minutes,
        seconds,
        hasFinshed,
        isActive,
        startCountdown,
        resetCountdown,
      }}
    >
      {children}
    </CountdownContext.Provider>
  );
};
