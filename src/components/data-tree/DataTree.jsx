import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import styles from "./DataTree.module.css";
const DataTree = ({ handleLocation, treeData }) => {
  const onSelect = (selectedKeys, info) => {
    handleLocation(info.node);
  };
  return (
    <article className={styles.container}>
      <h4>Lokasyonlar</h4>
      <Tree
        showLine
        switcherIcon={<DownOutlined />}
        defaultExpandedKeys={["0-0-0"]}
        onSelect={onSelect}
        treeData={treeData}
      />
    </article>
  );
};
export default DataTree;
