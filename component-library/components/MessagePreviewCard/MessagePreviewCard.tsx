import React from "react";

import { IconSkeletonLoader } from "../Loaders/SkeletonLoaders/IconSkeletonLoader";
import { ShortCopySkeletonLoader } from "../Loaders/SkeletonLoaders/ShortCopySkeletonLoader";

import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { classNames } from "../../../helpers";
import { Avatar } from "../Avatar/Avatar";

interface MessagePreviewCard {
  /**
   * What is the avatar url?
   */
  avatarUrl?: string;
  /**
   * What is the message text?
   */
  text?: string;
  /**
   * What is the display address associated with the message?
   */
  displayAddress?: string;
  /**
   * What is the datetime of the message
   */
  datetime?: Date;
  /**
   * Are we waiting on anything loading?
   */
  isLoading?: boolean;
  /**
   * What happens on message click?
   */
  onClick?: () => void;
  /**
   * Is conversation selected?
   */
  isSelected?: boolean;
  // To-do: Add error views once we have the designs
}

export const MessagePreviewCard = ({
  avatarUrl,
  text,
  displayAddress,
  datetime,
  isLoading = false,
  onClick,
  isSelected,
}: MessagePreviewCard) => {
  const isFirstMessage = !text && !displayAddress;

  if (!text && !isFirstMessage && !isLoading) {
    return null;
  }
  return (
    <div
      className={classNames(
        "flex justify-between items-start border border-t-0 border-gray-200 p-4 h-min cursor-pointer",
        isSelected ? "bg-gray-200" : "bg-gray-100",
      )}
      onClick={onClick}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={0}>
      <div className="mr-3 flex-none">
        <Avatar
          url={avatarUrl}
          address={displayAddress}
          isLoading={isLoading}
        />
      </div>
      <div className="flex flex-col items-start w-3/4">
        {isLoading ? (
          <ShortCopySkeletonLoader />
        ) : (
          <span className="text-md font-bold">
            {displayAddress ?? "New recipient"}
          </span>
        )}
        {isLoading ? (
          <ShortCopySkeletonLoader />
        ) : (
          <span className="text-md text-gray-600 line-clamp-1 max-w-[90%] break-all">
            {text ?? "New message"}
          </span>
        )}
      </div>
      {isLoading ? (
        <IconSkeletonLoader />
      ) : (
        <div
          className={classNames(
            "text-xs",
            "text-gray-600",
            "w-1/4",
            "text-right",
            "ml-4",
          )}>
          {datetime && `${formatDistanceToNow(datetime)} ago`}
        </div>
      )}
    </div>
  );
};
