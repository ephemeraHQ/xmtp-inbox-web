import { useEffect, useMemo } from "react";
import { useConsent, useDb } from "@xmtp/react-sdk";
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
  tab: "denied" | "allowed";
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
  const { db } = useDb();
  useStreamAllMessages();
  const recipientInput = useXmtpStore((s) => s.recipientInput);
  const activeTab = useXmtpStore((s) => s.activeTab);
  const { isAllowed, isDenied } = useConsent();

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

  const { blocked, requested, allowed } =
    filteredConversations.reduce<ConsentLists>(
      (acc, item: NodeWithConsent) => {
        if (item.props.tab === "denied") {
          acc.blocked.push(item);
        } else if (item.props.tab === "allowed") {
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
