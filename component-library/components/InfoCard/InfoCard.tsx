import { ChevronRightIcon } from "@heroicons/react/outline";
import React from "react";
import {
  IconLoader,
  ShortCopySkeletonLoader,
} from "../Loaders/SkeletonLoaders";
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
   * Should the top border be hidden?
   */
  hideTopBorder?: boolean;
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
  hideTopBorder = false,
}: InfoCardProps) => {
  return (
    <div
      className={`w-full flex py-2 px-4 flex items-center justify-between border-y border-gray-300 ${
        hideTopBorder && "border-t-0 "
      }`}>
      {isLoading ? (
        <ShortCopySkeletonLoader lines={2} />
      ) : (
        <div className="flex">
          <div
            className={`${getLeftIconBackground(
              leftIcon,
            )} p-2 mr-4 rounded-md h-fit`}>
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
          <IconLoader />
        ) : (
          onClick && (
            <ChevronRightIcon width="24" color="gray" className="ml-4" />
          )
        )}
      </div>
    </div>
  );
};
