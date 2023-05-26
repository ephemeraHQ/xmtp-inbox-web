import React from "react";
import { classNames } from "../../../helpers";
import loaderStyles from "../../../.storybook/Loaders/Loader.module.css";

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
          loaderStyles.btnLoader,
          color === "primary"
            ? loaderStyles.btnLoaderLight
            : loaderStyles.btnLoaderDark,
          size === "small"
            ? loaderStyles.btnLoaderXs
            : loaderStyles.btnLoaderSm,
          loaderStyles.animateSpin,
        )}
      />
    </div>
  );
};
