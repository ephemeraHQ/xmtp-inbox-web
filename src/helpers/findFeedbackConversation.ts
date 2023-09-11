import type { CachedConversation } from "@xmtp/react-sdk";
import { XMTP_FEEDBACK_ADDRESS } from "./constants";

export const findFeedbackConversation = (conversations: CachedConversation[]) =>
  conversations.find(
    (conversation) => conversation.peerAddress === XMTP_FEEDBACK_ADDRESS,
  );
