import React from "react";
import { classNames } from "../../../../src/helpers";
import styles from "./Loaders.module.css";

interface ButtonLoaderProps {
  /**
   * What color should the loader/spinner be?
   */
  color?: "primary" | "secondary";
  /**
   * How large is this button?
   */
  size?: "small" | "large";
}

/**
 * Primary UI component for user interaction
 */
export const ButtonLoader = ({
  size,
  color = "primary",
}: ButtonLoaderProps) => {
  // To-do: Change to proper loader once designs are finished
  return (
    <div className="flex flex-row">
      <div
        className={classNames(
          "rounded-full",
          styles.btnLoader,
          color === "primary" ? styles.btnLoaderLight : styles.btnLoaderDark,
          size === "small" ? styles.btnLoaderXs : styles.btnLoaderSm,
          styles.animateSpin,
        )}
      />
    </div>
  );
};
