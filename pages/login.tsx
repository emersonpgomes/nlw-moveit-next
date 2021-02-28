import { GetServerSideProps } from "next";
import Head from "next/head";
import { Login } from "../src/components/login";
import { Logo } from "../src/components/logo";
import { IUser } from "../src/contexts/user";
import styles from "../src/styles/pages/login.module.css";
import { deseralizeUser } from "../src/utils/deserialize-user";

export interface LoginPageProps {
  user: IUser | null;
}

export default function LoginPage({ user }: LoginPageProps) {
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
            <Login user={user} />
          </div>
        </section>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { currentUser } = ctx.req.cookies;

  return {
    props: {
      user: deseralizeUser(currentUser),
    },
  };
};
