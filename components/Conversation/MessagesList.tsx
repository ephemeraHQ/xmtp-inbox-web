import { DecodedMessage } from "@xmtp/xmtp-js";
import React, { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FullConversation } from "../../component-library/components/FullConversation/FullConversation";
import { FullMessage } from "../../component-library/components/FullMessage/FullMessage";
import { useAccount } from "wagmi";
import { formatDate } from "../../helpers";

const isOnSameDay = (d1?: Date, d2?: Date): boolean => {
  return d1?.toDateString() === d2?.toDateString();
};

export type MessageListProps = {
  messages: DecodedMessage[];
  fetchNextMessages: () => void;
  hasMore: boolean;
  isLoading?: boolean;
};

const LoadingMore: FC = () => (
  <div className="p-1 mt-6 text-center text-gray-300 font-bold text-sm">
    Loading Messages...
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

const MessagesList = ({
  messages,
  fetchNextMessages,
  hasMore,
}: MessageListProps): JSX.Element => {
  let lastMessageDate: Date | undefined;
  const { address: walletAddress } = useAccount();

  return (
    <InfiniteScroll
      dataLength={messages.length}
      next={fetchNextMessages}
      className="flex flex-col-reverse overflow-y-auto pl-4"
      height={"81vh"}
      inverse
      endMessage={!messages.length && <ConversationBeginningNotice />}
      hasMore={hasMore}
      loader={<LoadingMore />}>
      <FullConversation
        messages={messages?.map((msg, index) => {
          const dateHasChanged = lastMessageDate
            ? !isOnSameDay(lastMessageDate, msg.sent)
            : false;
          const messageDiv = (
            <div key={`${msg.id}_${index}`}>
              {index === messages.length - 1 ? (
                <ConversationBeginningNotice />
              ) : null}
              <FullMessage
                text={msg.content}
                key={`${msg.id}_${index}`}
                from={{
                  displayAddress: msg.senderAddress,
                  isSelf: walletAddress === msg.senderAddress,
                }}
                datetime={msg.sent}
              />
              {dateHasChanged ? <DateDivider date={lastMessageDate} /> : null}
            </div>
          );
          lastMessageDate = msg.sent;
          return messageDiv;
        })}
      />
    </InfiniteScroll>
  );
};

export default React.memo(MessagesList);
