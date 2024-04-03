import styles from "./LocationContainer.module.css";
const LocationContainer = (props) => {
  return <section className={styles.container}>{props.children}</section>;
};

export default LocationContainer;
