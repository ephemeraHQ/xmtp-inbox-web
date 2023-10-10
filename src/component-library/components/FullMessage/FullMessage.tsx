import { useCallback, useMemo, useState } from "react";
import type { KeyboardEventHandler, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import {
  useResendMessage,
  useReactions,
  useSendMessage,
  useClient,
} from "@xmtp/react-sdk";
import type {
  CachedConversation,
  CachedMessageWithId,
  CachedReaction,
} from "@xmtp/react-sdk";
import { ContentTypeReaction } from "@xmtp/content-type-reaction";
import { DateDivider } from "../DateDivider/DateDivider";
import { classNames } from "../../../helpers";
import { ReactionsBar } from "../ReactionsBar/ReactionsBar";

interface MessageSender {
  displayAddress: string;
  isSelf?: boolean;
}

const enterKey = "Enter";

type FullMessageProps = PropsWithChildren & {
  message: CachedMessageWithId;
  /**
   * what conversation is the message part of?
   */
  conversation: CachedConversation;
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
  "bg-white rounded-bl-lg pl-2 border-gray-200 border";

export const FullMessage = ({
  children,
  message,
  conversation,
  from,
  datetime,
  showDateDivider = false,
}: FullMessageProps) => {
  const { t } = useTranslation();
  const { resend, cancel } = useResendMessage();
  const { sendMessage } = useSendMessage();
  const [onHover, setOnHover] = useState(false);
  const reactions = useReactions(message) || [];
  const { client } = useClient();

  const handleResend = useCallback(() => {
    void resend(message);
  }, [message, resend]);

  const handleResendKeyDown = useCallback<KeyboardEventHandler<HTMLDivElement>>(
    (e) => {
      if (e.key === enterKey) {
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
      if (e.key === enterKey) {
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

  const deleteReaction = (reaction: CachedReaction) => {
    if (reaction.senderAddress === client?.address) {
      void sendMessage(
        conversation,
        {
          content: reaction.content,
          schema: "unicode",
          reference: message.xmtpID,
          action: "removed",
        },
        ContentTypeReaction,
      );
    }
  };

  const alignmentStyles = from.isSelf
    ? "items-end justify-end"
    : "items-start justify-start";

  return (
    <div
      data-testid="message-tile-container"
      className={classNames(
        "flex flex-col w-full px-4 md:px-8",
        alignmentStyles,
      )}>
      <div
        className={classNames(
          "text-sm",
          "flex",
          "flex-col",
          "max-w-[80%]",
          "md:max-w-[50%]",
          "w-fit",
          alignmentStyles,
        )}
        onMouseOut={() => setOnHover(false)}
        onBlur={() => setOnHover(false)}>
        <div
          className={classNames("flex flex-col max-w-full", alignmentStyles)}>
          <div
            className={classNames(onHover ? "opacity-1" : "opacity-0")}
            onMouseOver={() => setOnHover(true)}
            onFocus={() => setOnHover(true)}>
            <ReactionsBar
              message={message}
              conversation={conversation}
              setOnHover={setOnHover}
            />
          </div>
          <div
            role="button"
            tabIndex={0}
            onKeyDown={() => setOnHover(true)}
            className={classNames(
              "whitespace-pre-wrap p-2 px-3 rounded-tl-xl rounded-tr-xl my-1 max-w-fit break-words text-md pl-3 mt-0",
              messageBackgroundStyles,
            )}
            onMouseOver={() => setOnHover(true)}
            onFocus={() => setOnHover(true)}>
            {children}
          </div>
          <div
            className={classNames(
              "text-xs text-gray-500 w-full flex",
              alignmentStyles,
            )}>
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
          <div
            className={classNames("flex gap-x-1", alignmentStyles)}
            data-testid="reactions-container">
            {reactions.map((reaction) => (
              <div
                role="button"
                tabIndex={0}
                key={reaction.xmtpID}
                className={classNames(
                  " rounded-full border px-1 w-7 h-7 flex items-center justify-center",
                  reaction.senderAddress === client?.address
                    ? "border-indigo-600 cursor-pointer"
                    : "border-gray-200 cursor-auto",
                )}
                onKeyDown={(e) => {
                  if (e.key === enterKey) {
                    void deleteReaction(reaction);
                  }
                }}
                onClick={() => {
                  void deleteReaction(reaction);
                }}>
                {reaction.content}
              </div>
            ))}
          </div>
        </div>
      </div>
      {showDateDivider && <DateDivider date={datetime} />}
    </div>
  );
};
