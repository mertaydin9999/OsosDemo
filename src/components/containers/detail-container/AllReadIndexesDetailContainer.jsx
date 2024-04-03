import React from "react";
import styles from "./AllReadIndexesDetailContainer.module.css";
const AllReadIndexesDetailContainer = (props) => {
  return <div className={styles.container}>{props.children}</div>;
};

export default AllReadIndexesDetailContainer;
