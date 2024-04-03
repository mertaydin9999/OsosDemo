import React from "react";
import styles from "./TableContainer.module.css";
const TableContainer = (props) => {
  return <section className={styles.container}>{props.children}</section>;
};

export default TableContainer;
