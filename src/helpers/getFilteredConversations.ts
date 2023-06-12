import type { Conversation } from "@xmtp/react-sdk";
import { XMTP_FEEDBACK_ADDRESS } from "./constants";

const getFilteredConversations = (
  conversations: Map<string, Conversation>,
): Conversation[] => {
  const filteredConversation = [
    ...Array.from(conversations.values()).filter(
      (convo) => convo.peerAddress !== XMTP_FEEDBACK_ADDRESS,
    ),
  ];
  return filteredConversation;
};

export default getFilteredConversations;
