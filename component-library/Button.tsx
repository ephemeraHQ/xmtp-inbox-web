import React from "react";
import { ButtonLoader } from "./components/Loaders/ButtonLoader";
import { ArrowCircleRightIcon, PlusCircleIcon } from "@heroicons/react/outline";

interface ButtonProps {
  /**
   * What are the button contents?
   */
  label: React.ReactNode;
  /**
   * What type of button is this?
   */
  category?: "text" | "icon";
  /**
   * Is it the primary view of that button?
   */
  primary?: boolean;
  /**
   * How large is this button?
   */
  buttonSize?: "small" | "large";
  /**
   * Should the button display a loading state?
   */
  isLoading?: boolean;
  /**
   * Should the button be disabled?
   */
  isDisabled?: boolean;
  /**
   * What is the background of the button?
   */
  background?: "pill" | "ghost";
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * What should the screen reader text show?
   */
  srText?: string;
  /**
   * What icon should be displayed instead of the default right arrow?
   */
  icon?: React.ReactNode;
}

const classMapping = {
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
};

const getSizeClass = (buttonSize: string, isIcon?: boolean) => {
  const currentSize = buttonSize ? buttonSize : "large";
  if (isIcon) {
    return currentSize === "large" ? "text-lg" : "text-sm h-8";
  } else {
    return currentSize === "large"
      ? "text-lg h-12 px-6 py-4"
      : "text-sm h-8 px-4 py-2";
  }
};

/**
 * Button component that includes text
 */

export const TextButton = ({
  label,
  primary = true,
  icon = <ArrowCircleRightIcon width={24} />,
  isLoading = false,
  isDisabled = false,
  buttonSize = "large",
  background = "pill",
  srText = "",
}: ButtonProps) => {
  const disabled = isDisabled ? "opacity-50 cursor-not-allowed" : "";
  const sizeClass = getSizeClass(buttonSize);

  const backgroundColor = primary
    ? classMapping[background].primary.backgroundColor
    : classMapping[background].secondary.backgroundColor;

  const fontColor = primary
    ? classMapping[background].primary.fontColor
    : classMapping[background].secondary.fontColor;

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`${backgroundColor} ${fontColor} ${disabled} ${sizeClass} min-w-[25%] h-fit m-2 font-bold rounded-full`}
      aria-label={srText}>
      <>
        <div className="flex justify-center items-center h-fit">
          {label}
          {isLoading ? (
            <ButtonLoader color={fontColor} />
          ) : (
            <span className="pl-2">{icon}</span>
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
  buttonSize = "large",
  srText,
}: ButtonProps) => {
  const disabled = isDisabled ? "opacity-50 cursor-not-allowed" : "";
  const sizeClass = getSizeClass(buttonSize, true);
  const shape = primary
    ? "rounded-full"
    : "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl";
  const backgroundFocus = "focus:outline-none focus:ring focus:ring-indigo-800";

  return (
    <button
      type="button"
      disabled={isDisabled}
      className={`${backgroundFocus} ${sizeClass} ${disabled} ${shape} flex justify-center items-center p-0 h-fit`}
      aria-label={srText}>
      <>
        <div
          className={`bg-indigo-600 hover:bg-indigo-800 ${
            buttonSize === "small" ? "p-1 min-h-20" : "p-2 min-h-24"
          } ${shape}`}>
          {isLoading ? <ButtonLoader color={"white"} /> : label}
        </div>
      </>
    </button>
  );
};

export const Button = ({ category, ...children }: ButtonProps) => {
  switch (category) {
    case "text":
      return <TextButton {...children} />;
    case "icon":
      return <IconButton {...children} />;
    default:
      return <TextButton {...children} />;
  }
};
