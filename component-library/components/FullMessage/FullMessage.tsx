import React from "react";
import { format } from "date-fns";

interface MessageSender {
  displayAddress: string;
  isSelf?: boolean;
}

interface FullMessageProps {
  /**
   * What is the message text?
   */
  text: string;
  /**
   * who is the message from?
   */
  from: MessageSender;
  /**
   * What is the datetime of the message
   */
  datetime: Date;
}

export const FullMessage = ({ text, from, datetime }: FullMessageProps) => {
  const isOutgoingMessage = from.isSelf;

  const incomingMessageBackgroundStyles = "bg-gray-200 rounded-br-lg";
  const outgoingMessageBackgroundStyles =
    "bg-indigo-600 text-white rounded-bl-lg";

  return (
    <div
      className={`text-sm flex flex-col items-${
        isOutgoingMessage ? "end" : "start"
      }`}>
      <div className="w-1/2">
        {isOutgoingMessage ? (
          <span className="text-indigo-600 font-bold flex justify-end pr-4">{`${from.displayAddress} (you)`}</span>
        ) : (
          <span className="font-bold ml-4">{`${from.displayAddress}`}</span>
        )}
        <div
          className={`p-2 rounded-tl-xl rounded-tr-xl my-1 ${
            isOutgoingMessage
              ? outgoingMessageBackgroundStyles
              : incomingMessageBackgroundStyles
          }`}>
          {text}
        </div>
        <div
          className={`text-gray-300 w-full flex mb-4 ${
            isOutgoingMessage ? "justify-end pr-4" : "justify-start pl-4"
          }`}>
          {format(datetime, "h:mm a")}
        </div>
      </div>
    </div>
  );
};
