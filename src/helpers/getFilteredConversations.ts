import type { CachedConversation } from "@xmtp/react-sdk";
import { XMTP_FEEDBACK_ADDRESS } from "./constants";

const getFilteredConversations = (conversations: CachedConversation[]) =>
  conversations.filter((convo) => convo.peerAddress !== XMTP_FEEDBACK_ADDRESS);

export default getFilteredConversations;
