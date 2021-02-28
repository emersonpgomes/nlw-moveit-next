import React from "react";
import styles from "../styles/components/logo.module.css";

export interface LogoProps {}

export const Logo = (props: LogoProps) => (
  <img className={styles.logo} src="/logo-full-white.svg" alt="Logo move it" />
);
