import React from "react";
import styles from "./FormContainer.module.css";
const FormContainer = (props) => {
  return <section className={styles.container}>{props.children}</section>;
};

export default FormContainer;
