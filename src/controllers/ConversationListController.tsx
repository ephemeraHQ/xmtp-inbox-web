import { useEffect, useMemo, useState } from "react";
import { useConsent, useDb } from "@xmtp/react-sdk";
import type { CachedConversation } from "@xmtp/react-sdk";
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
  const [activeConversations, setActiveConversations] = useState<
    CachedConversation[]
  >([]);
  const { isLoaded, isLoading, conversations } = useListConversations();
  const { isAllowed, isDenied, consentState } = useConsent();

  const { db } = useDb();

  useStreamAllMessages();
  const recipientInput = useXmtpStore((s) => s.recipientInput);
  const activeTab = useXmtpStore((s) => s.activeTab);

  // when the conversations are loaded, update their identities
  useEffect(() => {
    const runUpdate = async () => {
      if (isLoaded) {
        await updateConversationIdentities(activeConversations, db);
      }
    };
    void runUpdate();
  }, [activeConversations, db, isLoaded]);

  useEffect(() => {
    const getActiveConversations = async () => {
      const active = await Promise.all(
        conversations.map(async (conversation) => {
          if (
            activeTab === "blocked" &&
            (await isDenied(conversation.peerAddress))
          ) {
            return conversation;
          }
          if (
            activeTab === "messages" &&
            (await isAllowed(conversation.peerAddress))
          ) {
            return conversation;
          }
          if (
            activeTab === "requests" &&
            (await consentState(conversation.peerAddress)) === "unknown"
          ) {
            return conversation;
          }
          return null;
        }),
      );
      setActiveConversations(active.filter(Boolean) as CachedConversation[]);
    };
    void getActiveConversations();
  }, [activeTab, consentState, conversations, isAllowed, isDenied]);

  const messagesToPass = useMemo(
    () =>
      activeConversations.map((conversation: CachedConversation) => (
        <MessagePreviewCardController
          key={conversation.topic}
          convo={conversation}
        />
      )),
    [activeConversations],
  );

  return (
    <ConversationList
      hasRecipientEnteredValue={!!recipientInput}
      setStartedFirstMessage={() => setStartedFirstMessage(true)}
      isLoading={isLoading}
      messages={messagesToPass}
      activeTab={activeTab}
    />
  );
};
