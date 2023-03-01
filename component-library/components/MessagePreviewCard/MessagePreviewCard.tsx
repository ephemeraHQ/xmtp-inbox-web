import React from "react";
import { Avatar } from "../Avatar/Avatar";
import {
  IconLoader,
  ShortCopySkeletonLoader,
} from "../Loaders/SkeletonLoaders";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

interface MessagePreviewCard {
  /**
   * What is the message text?
   */
  text?: string;
  /**
   * What is the avatar associated with the message?
   */
  avatar?: React.ReactNode;
  /**
   * What is the display address associated with the message?
   */
  displayAddress?: string;
  /**
   * What is the datetime of the message
   */
  datetime?: string;
  /**
   * Are we waiting on anything loading?
   */
  isLoading?: boolean;
  /**
   * What happens on message click?
   */
  onClick?: () => void;
  // To-do: Add error views once we have the designs
}

export const MessagePreviewCard = ({
  text = "New message",
  avatar = <Avatar />,
  displayAddress = "New recipient",
  datetime = formatDistanceToNow(new Date()),
  isLoading = false,
  onClick,
}: MessagePreviewCard) => {
  return (
    <div
      className="flex justify-between items-start bg-gray-50 border border-gray-200 p-2"
      onClick={onClick}>
      <div className="mr-2 flex-none">{avatar}</div>
      <div className="flex flex-col items-start w-3/4">
        {isLoading ? (
          <ShortCopySkeletonLoader />
        ) : (
          <span className="text-md font-bold">{displayAddress}</span>
        )}
        {isLoading ? (
          <ShortCopySkeletonLoader />
        ) : (
          <span className="text-md text-gray-500">{text}</span>
        )}
      </div>
      {isLoading ? (
        <IconLoader />
      ) : (
        <div className="text-xs text-gray-400 w-1/4 text-right">{datetime}</div>
      )}
    </div>
  );
};
