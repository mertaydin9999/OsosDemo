import React from "react";
import styles from "./LoginContainer.module.css";
const LoginContainer = (props) => {
  return <main className={styles["login-wrapper"]}>{props.children}</main>;
};

export default LoginContainer;
