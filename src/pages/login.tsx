import Head from "next/head";
import { Login } from "../components/login";
import { Logo } from "../components/logo";
import styles from "../styles/pages/login.module.css";

export default function LoginPage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Head>
          <title>Login | move.it</title>
        </Head>
        <section>
          <div></div>
          <div>
            <Logo />
            <Login />
          </div>
        </section>
      </div>
    </div>
  );
}
