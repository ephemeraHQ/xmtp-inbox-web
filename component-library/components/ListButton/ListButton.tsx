import React from "react";
import { ButtonLoader } from "../Loaders/ButtonLoader";

interface ListButtonProps {
  /**
   * What are the button contents?
   */
  label?: React.ReactNode;
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
   * Is there an icon that should override the default start icon?
   */
  startIconOverride?: React.ReactNode;
  /**
   * Is there an icon that should override the default end icon?
   */
  endIconOverride?: React.ReactNode;
  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Pill button component with text
 */

export const ListButton = ({
  label,
  isLoading = false,
  isDisabled = false,
  size = "large",
  srText = "",
  onClick,
  startIconOverride,
  endIconOverride,
  className,
}: ListButtonProps) => {
  const disabled = isDisabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isDisabled}
      className={`${className} ${disabled} h-fit rounded cursor-pointer`}
      aria-label={srText}>
      <>
        <div className="flex justify-center items-center h-fit">
          {startIconOverride}
          {label}
          {isLoading ? (
            <ButtonLoader color={"primary"} size={size} />
          ) : (
            endIconOverride
          )}
        </div>
      </>
    </button>
  );
};
