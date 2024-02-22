import { useEffect, useMemo } from "react";
import { useConsent, useDb } from "@xmtp/react-sdk";
import type { CachedConversation } from "@xmtp/react-sdk";
import type { ActiveTab } from "../store/xmtp";
import { useXmtpStore } from "../store/xmtp";
import useListConversations from "../hooks/useListConversations";
import { ConversationList } from "../component-library/components/ConversationList/ConversationList";
import { MessagePreviewCardController } from "./MessagePreviewCardController";
import useStreamAllMessages from "../hooks/useStreamAllMessages";
import { updateConversationIdentities } from "../helpers/conversation";

type ConversationListControllerProps = {
  setStartedFirstMessage: (startedFirstMessage: boolean) => void;
};

type ConsentProps = {
  tab: ActiveTab;
  convo: CachedConversation;
};

type NodeWithConsent = React.ReactElement<ConsentProps>;

export const ConversationListController = ({
  setStartedFirstMessage,
}: ConversationListControllerProps) => {
  const { isLoaded, isLoading, conversations } = useListConversations();
  const { isAllowed, isDenied } = useConsent();

  const { db } = useDb();

  useStreamAllMessages();
  const recipientInput = useXmtpStore((s) => s.recipientInput);
  const changedConsentCount = useXmtpStore((s) => s.changedConsentCount);

  const activeTab = useXmtpStore((s) => s.activeTab);

  // when the conversations are loaded, update their identities
  useEffect(() => {
    const runUpdate = async () => {
      if (isLoaded) {
        await updateConversationIdentities(conversations, db);
      }
    };
    void runUpdate();
  }, [isLoaded, activeTab, changedConsentCount, conversations, db]);

  const messagesToPass = useMemo(() => {
    const conversationsWithTab = conversations.map(
      (conversation: CachedConversation) => (
        <MessagePreviewCardController
          key={conversation.topic}
          convo={conversation}
        />
      ),
    );
    const sortedConvos = conversationsWithTab.filter(
      (item: NodeWithConsent) => {
        const isAddressBlocked = isDenied(item.props.convo.peerAddress);
        const isAddressAllowed = isAllowed(item.props.convo.peerAddress);

        if (activeTab === "messages") {
          return isAddressAllowed;
        }
        if (activeTab === "blocked") {
          return isAddressBlocked;
        }
        if (activeTab === "requests") {
          return !isAddressBlocked && !isAddressAllowed;
        }
        return null;
      },
    );
    return sortedConvos;
  }, [activeTab, conversations, isAllowed, isDenied]);

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
