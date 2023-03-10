import React from "react";
import { classNames } from "../../../helpers";
import {
  IconLoader,
  ShortCopySkeletonLoader,
} from "../Loaders/SkeletonLoaders";
import { iconMapping, SettingsIcon } from "./iconMapping";

interface SettingsCardProps {
  /**
   * What variant is this?
   */
  variant?: "primary" | "secondary";
  /**
   * What is the header text?
   */
  header: string;
  /**
  /**
   * What enum for the left icon should we use to map to its corresponding icon?
   */
  leftIcon?: SettingsIcon;
  /**
   * If there is a toggle, what should happen on change?
   */
  onToggle?: () => void | undefined;
  /**
   * Are we waiting on anything loading?
   */
  isLoading?: boolean;
}

/**
 *
 * Gets the mapped background of the SVG on the left icon
 */
const getLeftIconBackground = (leftIcon?: SettingsIcon) =>
  leftIcon ? iconMapping[leftIcon]?.backgroundColor : "";

/**
 *
 * Gets the mapped icon SVG to render
 */
const getLeftIcon = (leftIcon?: SettingsIcon) =>
  leftIcon ? iconMapping[leftIcon]?.icon : "";
/**
 *
 * Settings item
 */
export const SettingsCard = ({
  variant = "primary",
  header = "",
  leftIcon,
  onToggle = undefined,
  isLoading = false,
}: SettingsCardProps) => {
  return (
    <div
      className={classNames(
        "w-full",
        "bg-gray-50",
        "p-4",
        "flex",
        "justify-between",
        "items-center",
        variant === "secondary" ? "text-indigo-600" : "",
      )}>
      {isLoading ? (
        <ShortCopySkeletonLoader />
      ) : (
        <div className="flex align-center">
          <div
            className={classNames(
              leftIcon ? getLeftIconBackground(leftIcon) : "",
              "rounded-md",
              "p-1",
              "mr-4",
            )}>
            {leftIcon && getLeftIcon(leftIcon)}
          </div>
          <span className="font-bold flex items-center">{header}</span>
        </div>
      )}

      {isLoading && onToggle ? (
        <IconLoader />
      ) : (
        onToggle && (
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={onToggle}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
          </label>
        )
      )}
    </div>
  );
};
