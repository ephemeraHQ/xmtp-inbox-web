import { Conversation, DecodedMessage, SortDirection } from "@xmtp/react-sdk";
import { getConversationId } from "./string";

const fetchMostRecentMessage = async (
  convo: Conversation,
): Promise<{ key: string; message?: DecodedMessage }> => {
  const key = getConversationId(convo);
  const newMessages = await convo?.messages({
    limit: 1,
    direction: SortDirection.SORT_DIRECTION_DESCENDING,
  });

  if (!newMessages?.length) {
    return { key };
  }
  return { key, message: newMessages[0] };
};

export default fetchMostRecentMessage;
