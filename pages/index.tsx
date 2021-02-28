import { GetServerSideProps } from "next";
import Head from "next/head";
import { useContext, useEffect } from "react";
import { ChallengeBox } from "../src/components/challenge-box";
import { CompletedChallenges } from "../src/components/completed-challenges";
import { Countdown } from "../src/components/countdown";
import { ExperienceBar } from "../src/components/experience-bar";
import { Profile } from "../src/components/profile";
import { ChallengesProvider } from "../src/contexts/challenges";
import { CountdownProvider } from "../src/contexts/countdown";
import { IUser, UserContext } from "../src/contexts/user";
import styles from "../src/styles/pages/home.module.css";
import { deseralizeUser } from "../src/utils/deserialize-user";

export interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
  user: IUser;
}

export default function Home({
  user,
  level,
  currentExperience,
  challengesCompleted,
}: HomeProps) {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  return (
    <ChallengesProvider
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
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
    currentUser,
  } = ctx.req.cookies;

  const user = deseralizeUser(currentUser);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
      user,
    },
  };
};
