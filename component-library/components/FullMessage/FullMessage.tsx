import React from "react";
import { format } from "date-fns";
import { DateDivider } from "../DateDivider/DateDivider";
import { classNames } from "../../../helpers";
import { useTranslation } from "react-i18next";

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
   * What is the datetime of the message?
   */
  datetime: Date;
  /**
   * Should we show the date divider?
   */
  showDateDivider?: boolean;
}

export const FullMessage = ({
  text,
  from,
  datetime,
  showDateDivider = false,
}: FullMessageProps) => {
  const { t } = useTranslation();
  const isOutgoingMessage = from.isSelf;

  const incomingMessageBackgroundStyles = "bg-gray-200 rounded-br-lg pl-2";
  const outgoingMessageBackgroundStyles =
    "bg-indigo-600 text-white rounded-bl-lg";

  return (
    <div
      className={classNames(
        "flex flex-col w-full",
        isOutgoingMessage ? "items-end" : "items-start",
      )}>
      <div
        className={classNames(
          "text-sm",
          "flex",
          "flex-col",
          "sm:max-w-[75%]",
          "md:max-w-[50%]",
        )}>
        <div className={classNames("flex", "flex-col", "max-w-full")}>
          {isOutgoingMessage ? (
            <span className="text-indigo-600 font-bold flex justify-end">
              {t("messages.you", { ADDRESS: from.displayAddress })}
            </span>
          ) : (
            <span className="font-bold">{`${from.displayAddress}`}</span>
          )}
          <div
            className={`whitespace-pre-wrap p-2 px-3 rounded-tl-xl rounded-tr-xl my-1 max-w-full break-words text-md ${
              isOutgoingMessage
                ? outgoingMessageBackgroundStyles
                : incomingMessageBackgroundStyles
            }`}
            data-testid="message-tile-text">
            {text}
          </div>
          <div
            className={`text-gray-500 w-full flex mb-4 ${
              isOutgoingMessage ? "justify-end" : "justify-start"
            }`}>
            {format(datetime, "h:mm a")}
          </div>
        </div>
      </div>
      {showDateDivider && <DateDivider date={datetime} />}
    </div>
  );
};
