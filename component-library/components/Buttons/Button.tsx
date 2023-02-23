import React from "react";
import { ButtonLoader } from "../Loaders/ButtonLoader";
import { ArrowCircleRightIcon, PlusCircleIcon } from "@heroicons/react/outline";

interface ButtonProps {
  /**
   * What are the button contents?
   */
  label: React.ReactNode;
  /**
   * What type of button is this?
   */
  variant?: "pill" | "icon" | "ghost";
  /**
   * Is it the primary view of that button?
   */
  primary?: boolean;
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
}

const colorClassMapping = {
  pill: {
    primary: {
      backgroundColor:
        "bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-indigo-800",
      fontColor: "text-white",
    },
    secondary: {
      backgroundColor:
        "bg-red-600 hover:bg-red-800 focus:outline-none focus:ring focus:ring-red-800",
      fontColor: "text-white",
    },
  },
  ghost: {
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
  },
  icon: {
    primary: {
      backgroundColor:
        "bg-indigo-600 hover:bg-indigo-800 focus:outline-none focus:ring focus:ring-indigo-800",
      fontColor: null,
    },
    secondary: null,
  },
};

const sizeClassMapping = {
  pill: {
    large: "text-lg h-12 px-6 py-4",
    small: "text-sm h-8 px-4 py-2",
  },
  ghost: {
    large: "text-lg p-0",
    small: "text-sm p-0",
  },
  icon: {
    large: "text-lg p-0",
    small: "text-sm p-0",
  },
};

/**
 * Button component that includes text
 */

export const TextButton = ({
  label,
  variant = "pill",
  primary = true,
  isLoading = false,
  isDisabled = false,
  size = "large",
  srText = "",
}: ButtonProps) => {
  const disabled = isDisabled ? "opacity-50 cursor-not-allowed" : "";
  const sizeClass = sizeClassMapping[variant][size];

  const backgroundColor = primary
    ? colorClassMapping[variant].primary.backgroundColor
    : colorClassMapping[variant].secondary?.backgroundColor;

  const fontColor = primary
    ? colorClassMapping[variant].primary.fontColor
    : colorClassMapping[variant].secondary?.fontColor;

  const minWidth = size === "large" ? 25 : 20;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`${backgroundColor} ${fontColor} ${disabled} ${sizeClass} min-w-[${minWidth}%] h-fit m-2 font-bold rounded-full`}
      aria-label={srText}>
      <>
        <div className="flex justify-center items-center h-fit space-x-2">
          <div>{label}</div>
          {isLoading ? (
            <ButtonLoader color={"primary"} size={size} />
          ) : (
            <ArrowCircleRightIcon width={size === "large" ? 24 : 16} />
          )}
        </div>
      </>
    </button>
  );
};

/**
 * Icon-only button component
 */
export const IconButton = ({
  label = <PlusCircleIcon width="24" color="white" />,
  primary = true,
  isLoading = false,
  isDisabled = false,
  size = "large",
  srText,
}: ButtonProps) => {
  const disabled = isDisabled ? "opacity-50 cursor-not-allowed" : "";
  const sizeClass = sizeClassMapping.icon[size];
  const shape = primary
    ? "rounded-full"
    : "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl";

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`${colorClassMapping.icon.primary.backgroundColor} ${sizeClass} ${disabled} ${shape} flex justify-center items-center p-0 h-fit`}
      aria-label={srText}>
      <>
        <div
          className={`bg-indigo-600 hover:bg-indigo-800 ${
            size === "small" ? "p-1 min-h-20" : "p-2 min-h-24"
          } ${shape}`}>
          {isLoading ? <ButtonLoader color={"primary"} size={size} /> : label}
        </div>
      </>
    </button>
  );
};

export const Button = ({ variant, ...children }: ButtonProps) => {
  switch (variant) {
    case "pill":
      return <TextButton {...children} />;
    case "ghost":
      return <TextButton variant="ghost" {...children} />;
    case "icon":
      return <IconButton {...children} />;
    default:
      return <TextButton {...children} />;
  }
};
