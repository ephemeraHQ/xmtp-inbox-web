import { useEffect, useMemo } from "react";
import { useDb } from "@xmtp/react-sdk";
import { useXmtpStore } from "../store/xmtp";
import useListConversations from "../hooks/useListConversations";
import { ConversationList } from "../component-library/components/ConversationList/ConversationList";
import { MessagePreviewCardController } from "./MessagePreviewCardController";
import useStreamAllMessages from "../hooks/useStreamAllMessages";
import { updateConversationIdentities } from "../helpers/conversation";

type ConversationListControllerProps = {
  setStartedFirstMessage: (startedFirstMessage: boolean) => void;
};

export const ConversationListController = ({
  setStartedFirstMessage,
}: ConversationListControllerProps) => {
  const { isLoaded, isLoading, conversations } = useListConversations();
  const { db } = useDb();
  useStreamAllMessages();
  const recipientInput = useXmtpStore((s) => s.recipientInput);

  // when the conversations are loaded, update their identities
  useEffect(() => {
    const runUpdate = async () => {
      if (isLoaded) {
        await updateConversationIdentities(conversations, db);
      }
    };
    void runUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const filteredConversations = useMemo(() => {
    const convos = conversations.map((conversation) => (
      <MessagePreviewCardController
        key={conversation.topic}
        convo={conversation}
      />
    ));
    return convos;
  }, [conversations]);

  return (
    <ConversationList
      hasRecipientEnteredValue={!!recipientInput}
      setStartedFirstMessage={() => setStartedFirstMessage(true)}
      isLoading={isLoading}
      messages={!isLoading ? filteredConversations : []}
    />
  );
};
