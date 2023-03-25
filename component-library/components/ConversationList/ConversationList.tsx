import React from "react";
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
  /**
   * What function do we run to start the first message?
   */
  setStartedFirstMessage?: () => void;
  /**
   * Has a value been entered for the recipient?
   */
  hasRecipientEnteredValue?: boolean;
}

export const ConversationList = ({
  messages = [],
  isLoading,
  setStartedFirstMessage,
  hasRecipientEnteredValue,
}: ConversationListProps) => {
  return !messages?.length && isLoading ? (
    <div className="w-full pl-16 overflow-hidden h-full flex flex-col justify-start sm:w-full bg-gray-300">
      {Array(12).fill(<MessagePreviewCard isLoading />)}
    </div>
  ) : !messages.length && !isLoading && !hasRecipientEnteredValue ? (
    <div className="w-full pl-16 overflow-hidden sm:w-full sm:p-4 md:p-8 border border-gray-100 h-full">
      <EmptyMessage setStartedFirstMessage={setStartedFirstMessage} />
    </div>
  ) : (
    <div
      className="w-full pl-16 overflow-auto sm:w-full flex flex-col h-full bg-gray-100 border-x"
      data-testid="conversations-list-panel">
      {messages}
    </div>
  );
};
