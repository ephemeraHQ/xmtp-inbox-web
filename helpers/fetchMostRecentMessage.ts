import { Conversation, DecodedMessage, SortDirection } from '@xmtp/xmtp-js';
import { getConversationKey } from './string';

const fetchMostRecentMessage = async (
  convo: Conversation
): Promise<{ key: string; message?: DecodedMessage }> => {
  const key = getConversationKey(convo);
  const newMessages = await convo.messages({
    limit: 1,
    direction: SortDirection.SORT_DIRECTION_DESCENDING
  });
  if (newMessages.length <= 0) {
    return { key };
  }
  return { key, message: newMessages[0] };
};

export default fetchMostRecentMessage;
