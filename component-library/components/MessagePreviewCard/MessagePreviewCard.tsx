import React from "react";

import { IconSkeletonLoader } from "../Loaders/SkeletonLoaders/IconSkeletonLoader";
import { ShortCopySkeletonLoader } from "../Loaders/SkeletonLoaders/ShortCopySkeletonLoader";

import { classNames } from "../../../helpers";
import { Avatar } from "../Avatar/Avatar";
import { useTranslation } from "react-i18next";
import { formatDistanceToNowStrict } from "date-fns";

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
  /**
   * What is the app this conversation started on?
   */
  conversationDomain?: string;
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
  conversationDomain,
}: MessagePreviewCard) => {
  const isFirstMessage = !text && !displayAddress;
  const { t } = useTranslation();

  if (!text && !isFirstMessage && !isLoading) {
    return null;
  }
  return (
    <div
      className={classNames(
        "flex justify-between items-center border-0 border-b border-gray-200 outline-blue outline-b-0 h-min cursor-pointer",
        isSelected ? "bg-gray-200" : "bg-gray-100",
        isLoading ? "px-4 py-2" : "p-4",
      )}
      onClick={onClick}
      onKeyUp={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={0}>
      <div className="mr-3">
        <Avatar
          url={avatarUrl}
          address={displayAddress}
          isLoading={isLoading}
        />
      </div>
      <div className="flex flex-col items-start w-3/4">
        {!isLoading && conversationDomain && (
          <div className="text-sm mb-1 text-white px-2 rounded-lg bg-indigo-600">
            {conversationDomain}
          </div>
        )}
        {isLoading ? (
          <ShortCopySkeletonLoader />
        ) : (
          <span className="text-md font-bold">
            {displayAddress ?? t("messages.convos_empty_recipient_placeholder")}
          </span>
        )}
        {isLoading ? (
          <ShortCopySkeletonLoader />
        ) : (
          <span className="text-md text-gray-600 line-clamp-1 w-full break-all">
            {text ?? t("messages.convos_empty_text_placeholder")}
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
            "w-1/3",
            "text-right",
            "ml-4",
            "h-full",
          )}>
          {datetime && t("{{datetime, ago}}", { datetime })}
        </div>
      )}
    </div>
  );
};
