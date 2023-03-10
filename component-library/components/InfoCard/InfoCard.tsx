import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import { classNames } from "../../../helpers";
import { ShortCopySkeletonLoader } from "../Loaders/SkeletonLoaders/ShortCopySkeletonLoader";
import { IconSkeletonLoader } from "../Loaders/SkeletonLoaders/IconSkeletonLoader";
import { iconMapping, InfoCardIcon } from "./iconMapping";

interface InfoCardProps {
  /**
   * What is the header text?
   */
  header: string;
  /**
   * What is the optional subtext?
   */
  subtext?: string;
  /**
   * What enum for the left icon should we use to map to its corresponding icon?
   */
  leftIcon?: InfoCardIcon;
  /**
   * Are we waiting on anything loading?
   */
  isLoading?: boolean;
  /**
   * What is the click event?
   */
  onClick?: () => void;
  /**
   * Are there additional styles?
   */
  styles?: string;
}

/**
 *
 * Gets the mapped background of the SVG on the left icon
 */
const getLeftIconBackground = (leftIcon?: InfoCardIcon) =>
  leftIcon ? iconMapping[leftIcon]?.backgroundColor : "";

/**
 *
 * Gets the mapped icon SVG to render
 */
const getLeftIcon = (leftIcon?: InfoCardIcon) =>
  leftIcon ? iconMapping[leftIcon]?.icon : "";
/**
 *
 * Multi-line info card with icon component
 */
export const InfoCard = ({
  header,
  subtext,
  leftIcon,
  isLoading = false,
  onClick = undefined,
  styles,
}: InfoCardProps) => {
  return (
    <div
      className={classNames(
        "w-full",
        "flex",
        "py-2",
        "px-4",
        "flex",
        "items-center",
        "justify-between",
        "border-y",
        "border-gray-300",
        styles || null,
      )}>
      {isLoading ? (
        <ShortCopySkeletonLoader lines={2} />
      ) : (
        <div className="flex">
          <div
            className={classNames(
              getLeftIconBackground(leftIcon),
              "p-2",
              "mr-4",
              "rounded-md",
              "h-fit",
            )}>
            {getLeftIcon(leftIcon)}
          </div>
          <div className="flex flex-col">
            <div className="font-bold">{header}</div>
            <p className="text-gray-400 text-md">{subtext}</p>
          </div>
        </div>
      )}
      <div>
        {isLoading && onClick ? (
          <IconSkeletonLoader />
        ) : (
          onClick && (
            <ChevronRightIcon width="24" color="gray" className="ml-4" />
          )
        )}
      </div>
    </div>
  );
};
