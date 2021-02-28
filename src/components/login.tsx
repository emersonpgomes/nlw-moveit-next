import Cookies from "js-cookie";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { IUser, UserContext } from "../contexts/user";
import { getGitHubUserInfo } from "../services/get-github-user-info";
import styles from "../styles/components/login.module.css";
import { seralizeUser } from "../utils/serialize-user";

export interface LoginProps {
  user: IUser | null;
}

export const Login = (props: LoginProps) => {
  const router = useRouter();
  const { setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [username, setUsername] = useState(props.user?.username ?? "");

  const inputRef = useRef<HTMLInputElement>(null);

  function handleUsernameChange(evt: ChangeEvent<HTMLInputElement>) {
    setUsername(evt.target.value);

    if (error) {
      setError("");
    }
  }

  const handleSubmit = useCallback(
    async (evt: FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      if (username.trim().length < 3) {
        inputRef.current.focus();
        return setError("Digite pelo menos 3 caracteres");
      }

      try {
        const user = await getGitHubUserInfo(username);

        if (!user) {
          throw new Error(
            `Não foi possível obter os dados do usuário "${username}".`
          );
        }

        setUser(user);
        Cookies.set("currentUser", seralizeUser(user));
        Cookies.set("level", '1');
        Cookies.set("currentExperience", '0');
        Cookies.set("challengesCompleted", '0');
        router.push("/");
      } catch (err) {
        //TODO: Exibir mensagem de erro se não for possível obter os dados
        console.log(err);
      }
    },
    [username]
  );

  useEffect(() => {
    inputRef.current.focus();
    router.prefetch("/");
  }, []);

  return (
    <div className={styles.loginContainer}>
      <header>Bem-vindo</header>
      <p>
        <img src="/icons/github.svg" alt="Logo GitHub" />
        Faça login com seu GitHub para começar
      </p>
      <form action="" method="post" onSubmit={handleSubmit}>
        <div className={styles.field}>
          <input
            ref={inputRef}
            name="username"
            autoComplete="off"
            type="text"
            placeholder="Digite seu username"
            value={username}
            onChange={handleUsernameChange}
          />
          <button
            type="submit"
            className={`${username.length >= 3 ? styles.buttonActive : ""}`}
          >
            <img src="/icons/arrow-right.svg" alt="" />
          </button>
          <div className={styles.formError}>{!!error && error}</div>
        </div>
      </form>
    </div>
  );
};
