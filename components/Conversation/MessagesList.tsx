import { DecodedMessage } from "@xmtp/xmtp-js";
import React, { FC } from "react";
import Emoji from "react-emoji-render";
import Avatar from "../Avatar";
import { classNames, formatTime } from "../../helpers";
import AddressPill from "../AddressPill";
import InfiniteScroll from "react-infinite-scroll-component";
import useWindowSize from "../../hooks/useWindowSize";
import { address } from "../Address";
import { useAccount } from "wagmi";

export type MessageListProps = {
  messages: DecodedMessage[];
  fetchNextMessages: () => void;
  hasMore: boolean;
};

type MessageTileProps = {
  message: DecodedMessage;
};

const isOnSameDay = (d1?: Date, d2?: Date): boolean => {
  return d1?.toDateString() === d2?.toDateString();
};

const formatDate = (d?: Date) =>
  d?.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

const MessageTile = ({ message }: MessageTileProps): JSX.Element => {
  const { address: walletAddress } = useAccount();
  const userIsSender = message.senderAddress === walletAddress;

  return (
    <div
      className={classNames(
        "flex items-start mx-auto mb-4",
        userIsSender ? "justify-end" : "justify-start",
      )}>
      <div className={classNames("mx-4 max-w-[90%]")}>
        <div
          className={classNames(
            "flex",
            userIsSender ? "justify-end" : "justify-start",
          )}>
          <AddressPill
            address={message.senderAddress as address}
            userIsSender={userIsSender}
          />
        </div>
        <div
          className={classNames(
            "block text-md px-2 mt-1 font-normal break-words px-3 py-5",
            userIsSender
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-black",
            userIsSender
              ? "rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl"
              : "rounded-tl-2xl rounded-tr-2xl rounded-br-2xl",
          )}
          data-testid={"message-tile-text"}>
          {message.error ? (
            `Error: ${message.error?.message}`
          ) : (
            <Emoji text={message.content || ""} />
          )}
        </div>
        <div
          className={classNames(
            "mt-1 text-sm font-normal flex text-n-300 text-md uppercase",
            userIsSender ? "mr-2 justify-end" : "ml-2 justify-start",
          )}>
          {formatTime(message.sent)}
        </div>
      </div>
    </div>
  );
};

const DateDividerBorder: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <>
    <div className="grow h-0.5 bg-gray-300/25" />
    {children}
    <div className="grow h-0.5 bg-gray-300/25" />
  </>
);

const DateDivider = ({ date }: { date?: Date }): JSX.Element => (
  <div className="flex align-items-center items-center pb-8 pt-4">
    <DateDividerBorder>
      <span className="mx-11 flex-none text-gray-300 text-sm font-bold">
        {formatDate(date)}
      </span>
    </DateDividerBorder>
  </div>
);

const ConversationBeginningNotice = (): JSX.Element => (
  <div className="flex align-items-center justify-center pb-4 mt-4">
    <span
      className="text-gray-300 text-sm font-semibold"
      data-testid="message-beginning-text">
      This is the beginning of the conversation
    </span>
  </div>
);

const LoadingMore: FC = () => (
  <div className="p-1 mt-6 text-center text-gray-300 font-bold text-sm">
    Loading Messages...
  </div>
);

const MessagesList = ({
  messages,
  fetchNextMessages,
  hasMore,
}: MessageListProps): JSX.Element => {
  let lastMessageDate: Date | undefined;
  const size = useWindowSize();

  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={fetchNextMessages}
      className="flex flex-col-reverse overflow-y-auto pl-4"
      height={size[1] > 700 ? "86vh" : "83vh"}
      inverse
      endMessage={!messages.length && <ConversationBeginningNotice />}
      hasMore={hasMore}
      loader={<LoadingMore />}>
      <div
        className="flex flex-col-reverse"
        data-testid="message-tile-container">
        {messages?.map((msg: DecodedMessage, index: number) => {
          const dateHasChanged = lastMessageDate
            ? !isOnSameDay(lastMessageDate, msg.sent)
            : false;
          const messageDiv = (
            <div key={`${msg.id}_${index}`}>
              {index === messages.length - 1 ? (
                <ConversationBeginningNotice />
              ) : null}
              <MessageTile message={msg} />
              {dateHasChanged ? <DateDivider date={lastMessageDate} /> : null}
            </div>
          );
          lastMessageDate = msg.sent;
          return messageDiv;
        })}
      </div>
    </InfiniteScroll>
  );
};

export default React.memo(MessagesList);
