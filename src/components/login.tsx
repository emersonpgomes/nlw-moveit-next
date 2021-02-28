import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import styles from "../styles/components/login.module.css";

export interface LoginProps {}

export const Login = (props: LoginProps) => {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleUsernameChange(evt: ChangeEvent<HTMLInputElement>) {
    setUsername(evt.target.value);

    if (error) {
      setError("");
    }
  }

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (username.trim().length < 3) {
      inputRef.current.focus();
      return setError("Digite pelo menos 3 caracteres");
    }

    console.log("Sucesso");
    setUsername("");
  }

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
