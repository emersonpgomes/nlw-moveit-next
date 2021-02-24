import Head from 'next/head';
import { CompletedChallenges } from "../components/completed-challenges";
import { Countdown } from "../components/countdown";
import { ExperienceBar } from "../components/experience-bar";
import { Profile } from "../components/profile";
import styles from '../styles/pages/home.module.css';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Início | move.it</title>
      </Head>
      
      <ExperienceBar />

      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdown />
        </div>
        <div></div>
      </section>
    </div>
  );
}
