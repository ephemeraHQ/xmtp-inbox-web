/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  useMessages,
  type CachedConversation,
  useDb,
  ContentTypeId,
} from "@xmtp/react-sdk";
import { useEffect, useMemo, useRef, useState } from "react";
import { isSameDay } from "date-fns";
import { ContentTypeReply } from "@xmtp/content-type-reply";
import type { EffectType } from "@xmtp/experimental-content-type-screen-effect";
import { DateDivider } from "../component-library/components/DateDivider/DateDivider";
import { FullConversation } from "../component-library/components/FullConversation/FullConversation";
import { FullMessageController } from "./FullMessageController";
import { isMessageSupported } from "../helpers/isMessagerSupported";
import { updateConversationIdentity } from "../helpers/conversation";
import SnowEffect from "../component-library/components/ScreenEffects/SnowEffect";
import RainEffect from "../component-library/components/ScreenEffects/RainEffect";
import { useXmtpStore } from "../store/xmtp";

type FullConversationControllerProps = {
  conversation: CachedConversation;
};

export const FullConversationController: React.FC<
  FullConversationControllerProps
> = ({ conversation }) => {
  const lastMessageDateRef = useRef<Date>();
  const renderedDatesRef = useRef<Date[]>([]);
  const [effect, setEffect] = useState<EffectType | undefined>(undefined);

  const { db } = useDb();
  const [messageId, setMessageId] = useState<string>("");
  const conversationTopic = useXmtpStore((s) => s.conversationTopic);

  useEffect(() => {
    void updateConversationIdentity(conversation, db);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation.peerAddress]);

  // XMTP Hooks
  const { messages, isLoading } = useMessages(conversation);

  const messagesWithDates = useMemo(
    () =>
      messages?.map((msg, index) => {
        const contentType = ContentTypeId.fromString(msg.contentType);
        // if the message content type is not support and has no fallback,
        // disregard it

        // In this component so it takes up the entirety of the conversation view
        if (
          msg.content?.effectType === "SNOW" &&
          msg.conversationTopic === conversationTopic
        ) {
          if (!localStorage.getItem(String(msg.id))) {
            setEffect("SNOW");
            setMessageId(String(msg.id));
          }
        }
        if (
          msg.content?.effectType === "RAIN" &&
          msg.conversationTopic === conversationTopic
        ) {
          if (!localStorage.getItem(String(msg.id))) {
            setEffect("RAIN");
            setMessageId(String(msg.id));
          }
        }

        if (
          !isMessageSupported(msg) &&
          (!msg.contentFallback || contentType.sameAs(ContentTypeReply))
        ) {
          return null;
        }
        if (renderedDatesRef.current.length === 0) {
          renderedDatesRef.current.push(msg.sentAt);
        }
        const lastRenderedDate = renderedDatesRef.current.at(-1) as Date;
        const isFirstMessage = index === 0;
        const isSameDate = isSameDay(lastRenderedDate, msg.sentAt);
        const shouldDisplayDate = isFirstMessage || !isSameDate;

        if (shouldDisplayDate) {
          renderedDatesRef.current.push(msg.sentAt);
        }

        const messageDiv = (
          <div key={msg.uuid}>
            {shouldDisplayDate && (
              <DateDivider date={renderedDatesRef.current.at(-1) as Date} />
            )}
            <FullMessageController message={msg} conversation={conversation} />
          </div>
        );
        lastMessageDateRef.current = msg.sentAt;
        return msg?.content?.effectType || !msg.content ? null : messageDiv;
      }),
    [messages, conversation, conversationTopic],
  );

  return (
    <div
      id="scrollableDiv"
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      className="w-full h-full flex flex-col overflow-auto relative pb-4">
      {effect === "SNOW" ? (
        <SnowEffect messageId={messageId} key={messageId} />
      ) : effect === "RAIN" ? (
        <RainEffect messageId={messageId} key={messageId} />
      ) : null}
      <FullConversation
        isLoading={isLoading}
        messages={messagesWithDates}
        address={conversation.peerAddress}
      />
    </div>
  );
};
