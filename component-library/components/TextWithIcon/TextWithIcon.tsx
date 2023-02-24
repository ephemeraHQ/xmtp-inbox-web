import { CheckIcon, ChevronRightIcon } from "@heroicons/react/outline";
import {
  BellIcon,
  BookOpenIcon,
  ChatAlt2Icon,
  ChatAltIcon,
  EyeIcon,
  GiftIcon,
  PlusIcon,
  ShareIcon,
  SparklesIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import React from "react";
import { Disconnect } from "../Icons/Disconnect";
import { WalletAddress } from "../Icons/WalletAddress";
import { ShortCopySkeletonLoader } from "../Loaders/SkeletonLoaders";

interface TextWithIconProps {
  /**
   * What variant is this?
   */
  variant?: "primary" | "secondary" | "tertiary" | "address";
  /**
   * What is the header text?
   */
  header: string;
  /**
   * What is the optional subtext?
   */
  subtext?: string;
  /**
   * If address view, what avatar is shown?
   */
  avatar?: React.ReactNode;
  /**
   * What enum for the left icon should we use to map to its corresponding icon?
   */
  leftIcon?: string;
  /**
   * Does the right icon exist?
   */
  rightIcon?: boolean;
  /**
   * Are we waiting on anything loading?
   */
  isLoading?: boolean;
}

export const iconMapping = {
  ["NEW_MESSAGE" as string]: {
    icon: <ChatAltIcon width="24" color="#4F46E5" />,
    backgroundColor: "bg-indigo-100",
  },
  ["GALLERY" as string]: {
    icon: <SparklesIcon width="24" color="#4F46E5" />,
    backgroundColor: "bg-indigo-100",
  },
  ["DOCUMENTATION" as string]: {
    icon: <BookOpenIcon width="24" color="#4F46E5" />,
    backgroundColor: "bg-indigo-100",
  },
  ["CONNECT_WALLET" as string]: {
    icon: <ShareIcon width="24" color="#4F46E5" />,
    backgroundColor: null,
  },
  ["CREATE_WALLET" as string]: {
    icon: <PlusIcon width="24" color="#4F46E5" />,
    backgroundColor: null,
  },
  ["COLLECTIBLES" as string]: {
    icon: <GiftIcon width="16" color="green" />,
    backgroundColor: "bg-green-100",
  },
  ["NOTIFICATIONS" as string]: {
    icon: <BellIcon width="16" color="green" />,
    backgroundColor: "bg-green-100",
  },
  ["PRIVACY" as string]: {
    icon: <EyeIcon width="16" color="#4F46E5" />,
    backgroundColor: "bg-blue-100",
  },
  ["SUPPORT" as string]: {
    icon: <ChatAlt2Icon width="16" color="#4F46E5" />,
    backgroundColor: "bg-blue-100",
  },
  ["DATA" as string]: {
    icon: <TrashIcon width="16" color="red" />,
    backgroundColor: "bg-red-100",
  },
  ["DISCONNECT" as string]: {
    icon: <Disconnect />,
    backgroundColor: "bg-red-100",
  },
};

/**
 *
 * Gets the mapped background of the SVG on the left icon
 */
const getLeftIconBackground = (leftIcon = "") =>
  leftIcon ? iconMapping[leftIcon]?.backgroundColor : "";

/**
 *
 * Gets the mapped icon SVG to render
 */
const getLeftIcon = (leftIcon = "") =>
  leftIcon ? iconMapping[leftIcon]?.icon : "";

/**
 *
 * Default one-liner text with icon component
 */
const PrimaryTextWithIcon = ({
  header = "",
  leftIcon = "",
  rightIcon = false,
  isLoading = false,
}) => {
  return (
    <div className={"w-full bg-gray-50 p-4 flex justify-between items-center "}>
      {isLoading ? (
        <ShortCopySkeletonLoader />
      ) : (
        <div className="flex align-center">
          <div
            className={`${
              leftIcon && getLeftIconBackground(leftIcon)
            } rounded-md p-1 mr-4`}>
            {leftIcon && getLeftIcon(leftIcon)}
          </div>
          <span className="font-bold flex items-center">{header}</span>
        </div>
      )}

      {isLoading && rightIcon ? (
        <div role="status" className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
        </div>
      ) : (
        rightIcon && (
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-500"></div>
          </label>
        )
      )}
    </div>
  );
};

/**
 *
 * Secondary text styling for text with icon component
 */
const SecondaryTextWithIcon = ({
  header,
  leftIcon,
  isLoading = false,
}: TextWithIconProps) => {
  return (
    <div
      className={
        "w-full bg-gray-50 flex p-4 flex items-center font-semibold text-indigo-600"
      }>
      {isLoading ? (
        <ShortCopySkeletonLoader />
      ) : (
        <>
          <div className={`${getLeftIconBackground(leftIcon)} mr-2 rounded-md`}>
            {getLeftIcon(leftIcon)}
          </div>
          {header}
        </>
      )}
    </div>
  );
};

/**
 *
 * Multi-line text with icon component
 */
const TertiaryTextWithIcon = ({
  header,
  subtext,
  leftIcon,
  rightIcon,
  isLoading = false,
}: TextWithIconProps) => {
  return (
    <div
      className={
        "w-full flex py-2 px-4 flex items-center justify-between border-y border-gray-300"
      }>
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
        {isLoading && rightIcon ? (
          <div role="status" className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
          </div>
        ) : (
          rightIcon && (
            <ChevronRightIcon width="24" color="gray" className="ml-4" />
          )
        )}
      </div>
    </div>
  );
};

/**
 *
 * Avatar + address variation of text with icon component
 */
const AddressTextWithIcon = ({
  header,
  subtext,
  avatar,
  rightIcon,
  isLoading = false,
}: TextWithIconProps) => {
  return (
    <div
      className={`max-w-full bg-gray-50 flex p-2 flex items-center justify-between`}>
      <div className="flex items-center">
        {avatar}
        <div className="flex flex-col">
          {isLoading ? (
            <ShortCopySkeletonLoader lines={2} />
          ) : (
            <>
              <div className="font-bold ml-4">{header}</div>
              {subtext && (
                <span className="font-mono text-md flex ml-4">
                  <WalletAddress />
                  <span className="ml-2">{subtext}</span>
                </span>
              )}
            </>
          )}
        </div>
      </div>
      <div>
        {isLoading && rightIcon ? (
          <div role="status" className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-8"></div>
          </div>
        ) : (
          rightIcon && <CheckIcon width="24" />
        )}
      </div>
    </div>
  );
};

export const TextWithIcon = ({ variant, ...children }: TextWithIconProps) => {
  switch (variant) {
    case "primary":
      return <PrimaryTextWithIcon {...children} />;
    case "secondary":
      return <SecondaryTextWithIcon {...children} />;
    case "tertiary":
      return <TertiaryTextWithIcon {...children} />;
    case "address":
      return <AddressTextWithIcon {...children} />;
    default:
      return <PrimaryTextWithIcon {...children} />;
  }
};
