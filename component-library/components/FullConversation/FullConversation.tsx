import { format } from "date-fns";
import React from "react";
import { FullMessage } from "../FullMessage/FullMessage";
import { MessageLoader } from "../Loaders/SkeletonLoaders";

interface FullConversationProps {
  messages?: Array<typeof FullMessage>;
  convoStartDate?: Date;
  isLoading?: boolean;
}

export const FullConversation = ({
  messages = [],
  convoStartDate,
  isLoading = false,
}: FullConversationProps) => {
  const spanClasses =
    "text-gray-300 text-sm font-bold flex flex-col-reverse items-center m-4";

  if (isLoading) {
    const alternatingMessages = (
      <>
        <MessageLoader incoming={false} /> <MessageLoader />
      </>
    );
    return (
      <div className="h-full flex flex-col-reverse justify-start p-4 overflow-none">
        {Array(2).fill(alternatingMessages)}
      </div>
    );
  }
  return (
    <div className="h-full flex flex-col-reverse justify-start p-4 overflow-scroll">
      <>{messages}</>
      {convoStartDate && (
        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-b border-gray-300"></div>
          </div>
          <div className="relative flex justify-center">
            <span className={"bg-white px-3 text-sm text-gray-300 font-bold"}>
              {format(convoStartDate, "PPP")}
            </span>
          </div>
        </div>
      )}
      <span className={spanClasses}>
        This is the beginning of the conversation
      </span>
    </div>
  );
};
