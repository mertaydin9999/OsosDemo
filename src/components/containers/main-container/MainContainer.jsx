import React from "react";
import styles from "./MainContainer.module.css";

const MainContainer = (props) => {
  return <main className={styles.container}>{props.children}</main>;
};

export default MainContainer;
