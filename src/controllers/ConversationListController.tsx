import { useMemo } from "react";
import { useXmtpStore } from "../store/xmtp";
import useListConversations from "../hooks/useListConversations";
import { ConversationList } from "../component-library/components/ConversationList/ConversationList";
import getFilteredConversations from "../helpers/getFilteredConversations";
import { MessagePreviewCardController } from "./MessagePreviewCardController";
import { XMTP_FEEDBACK_ADDRESS } from "../helpers";
import useStartFeedbackConvo from "../hooks/useStartFeedbackConvo";
import useStreamAllMessages from "../hooks/useStreamAllMessages";
import { findFeedbackConversation } from "../helpers/findFeedbackConversation";

type ConversationListControllerProps = {
  setStartedFirstMessage: (startedFirstMessage: boolean) => void;
};

export const ConversationListController = ({
  setStartedFirstMessage,
}: ConversationListControllerProps) => {
  const { isLoading, conversations } = useListConversations();
  useStartFeedbackConvo();
  useStreamAllMessages();
  const recipientEnteredValue = useXmtpStore(
    (state) => state.recipientEnteredValue,
  );

  const feedbackConversation = useMemo(
    () => findFeedbackConversation(conversations),
    [conversations],
  );

  const filteredConversations = useMemo(() => {
    const filtered = getFilteredConversations(conversations).map(
      (conversation) => (
        <MessagePreviewCardController
          key={conversation.topic}
          convo={conversation}
        />
      ),
    );
    return feedbackConversation
      ? [
          <MessagePreviewCardController
            key={XMTP_FEEDBACK_ADDRESS}
            convo={feedbackConversation}
          />,
          ...filtered,
        ]
      : filtered;
  }, [conversations, feedbackConversation]);

  return (
    <ConversationList
      hasRecipientEnteredValue={!!recipientEnteredValue}
      setStartedFirstMessage={() => setStartedFirstMessage(true)}
      isLoading={isLoading}
      messages={!isLoading ? filteredConversations : []}
    />
  );
};
