import React from "react";
import { useXmtpStore } from "../store/xmtp";
import { Conversation } from "@xmtp/react-sdk";
import useListConversations from "../hooks/useListConversations";
import { ConversationList } from "../component-library/components/ConversationList/ConversationList";
import getFilteredConversations from "../helpers/getFilteredConversations";
import { MessagePreviewCardController } from "./MessagePreviewCardController";
import { XMTP_FEEDBACK_ADDRESS, getConversationId } from "../helpers";
import useStartFeedbackConvo from "../hooks/useStartFeedbackConvo";
import useStreamAllMessages from "../hooks/useStreamAllMessages";

type ConversationListControllerProps = {
  setStartedFirstMessage: (startedFirstMessage: boolean) => void;
};

export const ConversationListController = ({
  setStartedFirstMessage,
}: ConversationListControllerProps) => {
  useListConversations();
  useStartFeedbackConvo();
  useStreamAllMessages();
  const recipientEnteredValue = useXmtpStore(
    (state) => state.recipientEnteredValue,
  );
  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );
  const conversations = useXmtpStore((state) => state.conversations);
  const previewMessages = useXmtpStore((state) => state.previewMessages);

  const orderByLatestMessage = (
    convoA: Conversation,
    convoB: Conversation,
  ): number => {
    const convoALastMessageDate =
      previewMessages.get(getConversationId(convoA))?.sent || new Date();
    const convoBLastMessageDate =
      previewMessages.get(getConversationId(convoB))?.sent || new Date();
    return convoALastMessageDate < convoBLastMessageDate ? 1 : -1;
  };

  return (
    <ConversationList
      hasRecipientEnteredValue={!!recipientEnteredValue}
      setStartedFirstMessage={() => setStartedFirstMessage(true)}
      isLoading={loadingConversations}
      messages={
        !loadingConversations
          ? [
              <MessagePreviewCardController
                key={XMTP_FEEDBACK_ADDRESS}
                convo={conversations.get(XMTP_FEEDBACK_ADDRESS)}
              />,
              ...getFilteredConversations(conversations)
                .sort(orderByLatestMessage)
                .map((convo) => (
                  <MessagePreviewCardController
                    key={getConversationId(convo)}
                    convo={convo}
                  />
                )),
              ,
            ]
          : []
      }
    />
  );
};
