import { format } from "date-fns";
import React from "react";
import { MessageLoader } from "../Loaders/SkeletonLoaders";

interface FullConversationProps {
  messages?: Array<JSX.Element>;
  convoStartDate?: Date;
  isLoading?: boolean;
}

export const FullConversation = ({
  messages = [],
  convoStartDate,
  isLoading = false,
}: FullConversationProps) => {
  if (isLoading) {
    const alternatingMessages = (
      <>
        <MessageLoader incoming={false} /> <MessageLoader />
      </>
    );
    return (
      <div className="h-full flex flex-col-reverse justify-start p-4 overflow-none">
        {Array(10).fill(alternatingMessages)}
      </div>
    );
  }
  return (
    <div className="w-full h-full flex flex-col-reverse justify-start p-4 overflow-scroll">
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
    </div>
  );
};
