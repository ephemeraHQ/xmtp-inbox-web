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
}

export const ConversationList = ({
  messages = [],
  isLoading,
}: ConversationListProps) => {
  return !messages?.length && isLoading ? (
<<<<<<< HEAD
    <div className="w-fit overflow-hidden h-screen w-full bg-gray-300">
=======
    <div className="w-fit overflow-hidden h-screen flex flex-col justify-start sm:w-full bg-gray-300">
>>>>>>> main
      {Array(12).fill(<MessagePreviewCard isLoading />)}
    </div>
  ) : !messages.length && !isLoading ? (
    <div className="w-fit overflow-hidden sm:w-full p-8 border border-gray-100 h-screen">
      <EmptyMessage />
    </div>
  ) : (
<<<<<<< HEAD
    <div className="w-full overflow-scroll flex flex-col h-screen bg-gray-100">
=======
    <div className="w-full overflow-auto sm:w-full flex flex-col h-screen bg-gray-100">
>>>>>>> main
      {messages}
    </div>
  );
};
