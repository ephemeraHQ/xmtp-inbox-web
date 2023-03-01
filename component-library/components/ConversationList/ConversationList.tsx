import React from "react";
import { Avatar } from "../Avatar/Avatar";
import { EmptyMessage } from "../EmptyMessage/EmptyMessage";
import { MessagePreviewCard } from "../MessagePreviewCard/MessagePreviewCard";

interface ConversationListProps {
  /**
   * What conversations should we render?
   */
  messages?: Array<React.ReactNode>;
  /**
   * Are we waiting on anything loading?
   */
  isLoading?: boolean;
}

export const ConversationList = ({
  messages = [],
  isLoading,
}: ConversationListProps) => {
  return !messages?.length && isLoading ? (
    <>
      {Array(20).fill(
        <MessagePreviewCard avatar={<Avatar isLoading />} isLoading />,
      )}
    </>
  ) : !messages.length && !isLoading ? (
    <div className="border border-gray-100">
      <EmptyMessage />
    </div>
  ) : (
    <>{messages}</>
  );
};
