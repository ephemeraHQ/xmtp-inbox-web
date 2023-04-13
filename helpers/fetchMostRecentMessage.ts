import { Conversation, DecodedMessage, SortDirection } from "@xmtp/xmtp-js";
import { ContentTypeReadReceipt } from "../codecs/ReadReceipt";
import { getConversationId } from "./string";

const fetchMostRecentMessage = async (
  convo: Conversation,
): Promise<{ key: string; message?: DecodedMessage }> => {
  const key = getConversationId(convo);

  const newMessages = await convo?.messages({
    limit: 20,
    direction: SortDirection.SORT_DIRECTION_DESCENDING,
  });

  const filteredMessages = newMessages.filter(
    (msg) =>
        msg?.contentType?.typeId !== ContentTypeReadReceipt?.typeId
)

  if (!newMessages?.length) {
    return { key };
  }
  return { key, message: filteredMessages[0] };
};

export default fetchMostRecentMessage;
