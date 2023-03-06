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
    <div className="h-screen w-full bg-gray-300">
      {Array(20).fill(
        <MessagePreviewCard avatar={<Avatar isLoading />} isLoading />,
      )}
    </div>
  ) : !messages.length && !isLoading ? (
    <div className="border border-gray-100 h-screen">
      <EmptyMessage />
    </div>
  ) : (
    <div className="flex flex-col h-screen bg-gray-100">{messages}</div>
  );
};
