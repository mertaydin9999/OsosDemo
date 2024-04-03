import React from "react";
import { pageHeader } from "../../utils/dataFunctions";
import styles from "./PageHeader.module.css";
const PageHeader = ({ currentUrl }) => {
  return (
    <div className={styles["header-div"]}>
      <h2>{pageHeader(currentUrl)}</h2>
    </div>
  );
};

export default PageHeader;
