import { format } from "date-fns";
import React from "react";
import { FullMessage } from "../FullMessage/FullMessage";

interface FullConversationProps {
  messages: Array<typeof FullMessage>;
  convoStartDate?: Date;
}

export const FullConversation = ({
  messages = [],
  convoStartDate,
}: FullConversationProps) => {
  const spanClasses =
    "text-gray-300 text-sm font-bold flex flex-col-reverse items-center m-4";

  return (
    <div className="min-h-screen flex flex-col justify-end">
      <span className={spanClasses}>
        This is the beginning of the conversation
      </span>
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
      <>{messages}</>
    </div>
  );
};
