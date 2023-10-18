/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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
  const activeTab = useXmtpStore((s) => s.activeTab);
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

  const getFraudScore = async (address: string) => {
    try {
      const response = await fetch(
        `https://2krrxo6ed2.execute-api.us-east-1.amazonaws.com/ext/addresses/${address}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            "x-api-key": import.meta.env.VITE_WEBACY_TOKEN,
          },
        },
      );

      const riskRes = await response.json();

      const addressesCheckedForFraud = JSON.parse(
        window.localStorage.getItem("addressesCheckedForFraud") || "{}",
      );

      addressesCheckedForFraud[address] = riskRes;

      window.localStorage.setItem(
        "addressesCheckedForFraud",
        JSON.stringify(addressesCheckedForFraud),
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log("error", e);
    }
  };

  const filteredConversations = useMemo(() => {
    const convos = conversations.map((conversation) => {
      const addressesCheckedForFraud = JSON.parse(
        window.localStorage.getItem("addressesCheckedForFraud") || "{}",
      );
      const fraudScore = addressesCheckedForFraud[conversation.peerAddress];

      if (!fraudScore || !fraudScore.count) {
        void getFraudScore(conversation.peerAddress);
      }
      return (
        <MessagePreviewCardController
          key={conversation.topic}
          convo={conversation}
          spamScore={fraudScore?.overallRisk}
        />
      );
    });
    return convos;
  }, [conversations]);

  const { spamConvos, nonSpamConvos } = filteredConversations.reduce<{
    spamConvos: { props: { spamScore: number } }[];
    nonSpamConvos: { props: { spamScore: number } }[];
  }>(
    (acc, item) => {
      // UPDATE THRESHOLD HERE
      const threshold = 10;
      if (item.props.spamScore > threshold) {
        acc.spamConvos.push(item);
      } else if (item.props.spamScore <= threshold) {
        acc.nonSpamConvos.push(item);
      }
      return acc;
    },
    { spamConvos: [], nonSpamConvos: [] },
  );

  return (
    <ConversationList
      hasRecipientEnteredValue={!!recipientInput}
      setStartedFirstMessage={() => setStartedFirstMessage(true)}
      isLoading={isLoading}
      // @ts-ignore
      messages={
        !isLoading
          ? activeTab === "Messages"
            ? nonSpamConvos
            : spamConvos
          : []
      }
    />
  );
};
