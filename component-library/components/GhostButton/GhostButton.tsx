import React from "react";
import { ButtonLoader } from "../Loaders/ButtonLoader";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import { classNames } from "../../../helpers";

interface GhostButtonProps {
  /**
   * What are the button contents?
   */
  label: React.ReactNode;
  /**
   * Is this in the primary or secondary colors?
   */
  variant?: "primary" | "secondary";
  /**
   * How large is this button?
   */
  size?: "small" | "large";
  /**
   * Should the button display a loading state?
   */
  isLoading?: boolean;
  /**
   * Should the button be disabled?
   */
  isDisabled?: boolean;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * What should the screen reader text show?
   */
  srText?: string;
  /**
   * Is there an icon that should override the current icon?
   */
  icon?: React.ReactNode;
  /**
   * What is the test id associated with this button?
   */
  testId?: string;
}

const colorClassMapping = {
  primary: {
    backgroundColor: "white",
    fontColor:
      "text-indigo-600 hover:text-indigo-800 focus:outline-none focus:ring focus:ring-indigo-800",
  },
  secondary: {
    backgroundColor: "white",
    fontColor:
      "text-red-600 hover:text-red-800 focus:outline-none focus:ring focus:ring-red-800",
  },
};

const sizeClassMapping = {
  large: "text-lg p-0",
  small: "text-sm p-0",
};

/**
 * Ghost button component that includes text
 */

export const GhostButton = ({
  label,
  variant = "primary",
  isLoading = false,
  isDisabled = false,
  size = "large",
  srText = "",
  onClick,
  icon = <ArrowCircleRightIcon width={size === "large" ? 24 : 16} />,
  testId,
}: GhostButtonProps) => {
  const disabled = isDisabled ? "opacity-50 cursor-not-allowed" : "";
  const sizeClass = sizeClassMapping[size];

  const { backgroundColor, fontColor } =
    variant === "primary"
      ? colorClassMapping.primary
      : colorClassMapping.secondary;

  const minWidth = size === "large" ? 25 : 20;

  return (
    <button
      data-testid={testId}
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={classNames(
        backgroundColor,
        fontColor,
        disabled,
        sizeClass,
        `min-w-[${minWidth}%]`,
        "h-fit",
        "font-bold",
        "rounded-full",
        "m-1",
        "p-1",
      )}
      aria-label={srText}>
      <>
        <div className="flex justify-center items-center h-fit space-x-2">
          <div>{label}</div>
          {isLoading ? <ButtonLoader color={"primary"} size={size} /> : icon}
        </div>
      </>
    </button>
  );
};
