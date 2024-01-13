import { useEffect, useMemo } from "react";
import { useConsent, useDb } from "@xmtp/react-sdk";
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
};

type NodeWithConsent = React.ReactElement<ConsentProps>;

type ConsentLists = {
  blocked: NodeWithConsent[];
  requested: NodeWithConsent[];
  allowed: NodeWithConsent[];
};

export const ConversationListController = ({
  setStartedFirstMessage,
}: ConversationListControllerProps) => {
  const { isLoaded, isLoading, conversations } = useListConversations();
  const { isAllowed, isDenied } = useConsent();

  const { db } = useDb();
  useStreamAllMessages();
  const recipientInput = useXmtpStore((s) => s.recipientInput);
  const activeTab = useXmtpStore((s) => s.activeTab);

  // when the conversations are loaded, update their identities
  useEffect(() => {
    const runUpdate = async () => {
      if (isLoaded) {
        await updateConversationIdentities(conversations, db);
      }
    };
    void runUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, activeTab]);

  const filteredConversations = useMemo(() => {
    const convos = conversations.map((conversation) => (
      <MessagePreviewCardController
        key={conversation.topic}
        convo={conversation}
        tab={
          isAllowed(conversation.peerAddress)
            ? "messages"
            : isDenied(conversation.peerAddress)
            ? "blocked"
            : "requests"
        }
      />
    ));
    return convos;
  }, [conversations, isAllowed, isDenied]);

  const { blocked, requested, allowed } =
    filteredConversations.reduce<ConsentLists>(
      (acc, item: NodeWithConsent) => {
        if (item.props.tab === "blocked") {
          acc.blocked.push(item);
        } else if (item.props.tab === "messages") {
          acc.allowed.push(item);
        } else {
          acc.requested.push(item);
        }
        return acc;
      },
      { blocked: [], requested: [], allowed: [] },
    );

  const messagesToPass = !isLoading
    ? activeTab === "messages"
      ? allowed
      : activeTab === "blocked"
      ? blocked
      : requested
    : [];

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
