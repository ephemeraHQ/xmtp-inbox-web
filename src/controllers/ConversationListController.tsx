import { useEffect, useMemo, useState } from "react";
import {
  getLastMessage,
  getMessageByXmtpID,
  useClient,
  useConsent,
  useDb,
  useMessages,
} from "@xmtp/react-sdk";
import type { ActiveTab } from "../store/xmtp";
import { useXmtpStore } from "../store/xmtp";
import useListConversations from "../hooks/useListConversations";
import { ConversationList } from "../component-library/components/ConversationList/ConversationList";
import { MessagePreviewCardController } from "./MessagePreviewCardController";
import useStreamAllMessages from "../hooks/useStreamAllMessages";
import { updateConversationIdentities } from "../helpers/conversation";
import { useWalletClient } from "wagmi";

type ConversationListControllerProps = {
  setStartedFirstMessage: (startedFirstMessage: boolean) => void;
};

type ConsentProps = {
  tab: ActiveTab;
};

type NodeWithConsent = React.ReactElement<ConsentProps>;

export const ConversationListController = ({
  setStartedFirstMessage,
}: ConversationListControllerProps) => {
  const { isLoaded, isLoading, conversations } = useListConversations();
  const { isAllowed, isDenied } = useConsent();

  const { db } = useDb();
  const [messages, setMessages] = useState([]);
  const messagesDb = db.table("messages");

  useStreamAllMessages();
  const { client: walletAddress } = useClient();
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

  let isFilterLoading = false;

  useEffect(() => {
    // Fetch messages asynchronously
    const fetchMessages = async () =>
      messagesDb
        .where("senderAddress")
        .equals(walletAddress?.address)
        .toArray()
        .then((messages) => {
          // Process your messages here
          setMessages(messages);
        })
        .catch((error) => {
          console.error("Error querying messages:", error);
        });

    void fetchMessages();
  }, [filteredConversations, messagesDb, walletAddress?.address]);

  const messagesToPass = useMemo(() => {
    isFilterLoading = true;
    const sortedConvos = filteredConversations.filter(
      (item: NodeWithConsent) => {
        console.log("MESSAGES", messages);
        const hasSentMessages = messages.find(
          (message) => message?.conversationTopic === item.props.convo.topic,
        );
        if (activeTab === "messages") {
          // Still want to keep blocked in blocked, even if those still have messages
          return (
            item.props.tab === "messages" ||
            (item.props.tab === "requests" && hasSentMessages)
          );
        }
        if (activeTab === "blocked") {
          return item.props.tab === "blocked";
        }
        // Find the sent messages in this conversation

        return item.props.tab === "requests";
      },
    );
    isFilterLoading = false;
    return sortedConvos;
  }, [
    filteredConversations,
    isLoading,
    activeTab,
    walletAddress,
    db,
    isFilterLoading,
  ]);

  return (
    <ConversationList
      hasRecipientEnteredValue={!!recipientInput}
      setStartedFirstMessage={() => setStartedFirstMessage(true)}
      isLoading={isLoading || isFilterLoading}
      messages={messagesToPass}
      activeTab={activeTab}
    />
  );
};
