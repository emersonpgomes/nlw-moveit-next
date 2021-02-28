import { GetServerSideProps } from "next";
import Head from "next/head";
import { ChallengeBox } from "../components/challenge-box";
import { CompletedChallenges } from "../components/completed-challenges";
import { Countdown } from "../components/countdown";
import { ExperienceBar } from "../components/experience-bar";
import { Profile } from "../components/profile";
import { ChallengesProvider } from "../contexts/challenges";
import { CountdownProvider } from "../contexts/countdown";
import styles from "../styles/pages/home.module.css";

export interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  console.log(props);
  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    level = 1,
    currentExperience = 0,
    challengesCompleted = 0,
  } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
