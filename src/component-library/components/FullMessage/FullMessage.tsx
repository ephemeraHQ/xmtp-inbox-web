import { useCallback, useMemo } from "react";
import type { KeyboardEventHandler, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { useResendMessage } from "@xmtp/react-sdk";
import type { CachedMessageWithId } from "@xmtp/react-sdk";
import { DateDivider } from "../DateDivider/DateDivider";
import { classNames } from "../../../helpers";

interface MessageSender {
  displayAddress: string;
  isSelf?: boolean;
}

type FullMessageProps = PropsWithChildren & {
  message: CachedMessageWithId;
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
};

const incomingMessageBackgroundStyles = "bg-gray-200 rounded-br-lg pl-2";
const outgoingMessageBackgroundStyles =
  "bg-indigo-600 text-white rounded-bl-lg message-sender";
const errorMessageBackgroundStyles =
  "bg-white rounded-bl-lg pl-2 border-red-600 border";

export const FullMessage = ({
  children,
  message,
  from,
  datetime,
  showDateDivider = false,
}: FullMessageProps) => {
  const { t } = useTranslation();
  const { resend, cancel } = useResendMessage();

  const handleResend = useCallback(() => {
    void resend(message);
  }, [message, resend]);

  const handleResendKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (e) => {
      if (e.key === "Enter") {
        void handleResend();
      }
    },
    [handleResend],
  );

  const handleCancel = useCallback(() => {
    void cancel(message);
  }, [message, cancel]);

  const handleCancelKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (e) => {
      if (e.key === "Enter") {
        void handleCancel();
      }
    },
    [handleCancel],
  );

  const messageBackgroundStyles = useMemo(() => {
    if (message.hasLoadError) {
      return errorMessageBackgroundStyles;
    }
    if (from.isSelf) {
      return outgoingMessageBackgroundStyles;
    }
    return incomingMessageBackgroundStyles;
  }, [from.isSelf, message.hasLoadError]);

  return (
    <div
      className={classNames(
        "flex flex-col w-full px-4 md:px-8",
        from.isSelf ? "items-end" : "items-start",
      )}>
      <div
        className={classNames(
          "text-sm",
          "flex",
          "flex-col",
          "max-w-[80%]",
          "md:max-w-[50%]",
          "w-fit",
          from.isSelf ? "justify-end" : "justify-start",
        )}>
        <div className="flex flex-col max-w-full">
          <div
            className={`whitespace-pre-wrap p-2 px-3 rounded-tl-xl rounded-tr-xl my-1 max-w-full break-words text-md pl-3 ${messageBackgroundStyles}`}>
            {children}
          </div>
          <div
            className={`text-xs text-gray-500 w-full flex mb-4 ${
              from.isSelf ? "justify-end" : "justify-start"
            }`}>
            {message.hasSendError ? (
              <div className="text-red-600 flex align-center font-bold gap-1">
                <div>{t("messages.message_not_delivered")}</div>
                <div>&bull;</div>
                <div
                  role="button"
                  tabIndex={0}
                  className="underline"
                  onKeyDown={handleResendKeyDown}
                  onClick={handleResend}>
                  {t("messages.message_retry")}
                </div>
                <div>&bull;</div>
                <div
                  role="button"
                  tabIndex={0}
                  className="underline"
                  onKeyDown={handleCancelKeyDown}
                  onClick={handleCancel}>
                  {t("messages.message_cancel")}
                </div>
              </div>
            ) : (
              t("{{datetime, time}}", { datetime })
            )}
          </div>
        </div>
      </div>
      {showDateDivider && <DateDivider date={datetime} />}
    </div>
  );
};
