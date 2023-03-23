import React, { useCallback, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { DateDivider } from "../component-library/components/DateDivider/DateDivider";
import { FullConversation } from "../component-library/components/FullConversation/FullConversation";
import useGetMessages from "../hooks/useGetMessages";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import { useXmtpStore } from "../store/xmtp";
import { FullMessageWrapper } from "./FullMessageWrapper.";

export const FullConversationWrapper = () => {
  let lastMessageDate: Date;

  // Local state
  const [endTime, setEndTime] = useState<Map<string, Date>>(new Map());

  // XMTP State
  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );

  // XMTP Hooks
  const { conversationId } = useGetRecipientInputMode();
  const { convoMessages: messages = [], hasMore } = useGetMessages(
    conversationId as string,
    endTime.get(conversationId as string),
  );

  const isOnSameDay = (d1?: Date, d2?: Date): boolean => {
    return d1?.toDateString() === d2?.toDateString();
  };

  const fetchNextMessages = useCallback(() => {
    if (
      hasMore &&
      Array.isArray(messages) &&
      messages.length > 0 &&
      conversationId
    ) {
      const lastMsgDate = messages[messages.length - 1].sent;
      const currentEndTime = endTime.get(conversationId);
      if (!currentEndTime || lastMsgDate <= currentEndTime) {
        endTime.set(conversationId, lastMsgDate);
        setEndTime(new Map(endTime));
      }
    }
  }, [conversationId, hasMore, messages, endTime]);

  return (
    <div
      id="scrollableDiv"
      tabIndex={0}
      className="w-full h-full flex flex-col flex-col-reverse overflow-auto">
      <InfiniteScroll
        className="flex flex-col flex-col-reverse"
        dataLength={messages.length}
        next={fetchNextMessages}
        endMessage={!messages?.length}
        hasMore={hasMore}
        inverse
        loader={true}
        scrollableTarget="scrollableDiv">
        <FullConversation
          isLoading={loadingConversations}
          messages={messages?.map((msg, index) => {
            const dateHasChanged = lastMessageDate
              ? !isOnSameDay(lastMessageDate, msg.sent)
              : false;
            const messageDiv = (
              <div key={`${msg.id}_${index}`}>
                {(messages.length === 1 || index === messages.length - 1) &&
                !dateHasChanged ? (
                  <DateDivider date={msg.sent} />
                ) : null}
                <FullMessageWrapper msg={msg} idx={index} />
                {dateHasChanged ? <DateDivider date={lastMessageDate} /> : null}
              </div>
            );
            lastMessageDate = msg.sent;
            return messageDiv;
          })}
        />
      </InfiniteScroll>
    </div>
  );
};
