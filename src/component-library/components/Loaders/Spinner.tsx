import styles from "./Loaders.module.css";

// To-do: this is temporary; update with finalized loader
export const Spinner = (): JSX.Element | null => (
  <div className={styles["lds-roller"]}>
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);
