import loaderStyles from "./Loader.module.css";

// To-do: this is temporary; update with finalized loader
export const Spinner = (): JSX.Element | null => (
  <div className={loaderStyles["lds-roller"]}>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);
