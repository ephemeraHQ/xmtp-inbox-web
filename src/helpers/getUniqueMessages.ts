import type { DecodedMessage } from "@xmtp/react-sdk";

const getUniqueMessages = (msgObj: DecodedMessage[]): DecodedMessage[] => {
  const uniqueMessages = [
    ...Array.from(new Map(msgObj?.map((item) => [item["id"], item])).values()),
  ];
  uniqueMessages.sort((a, b) => {
    return (b.sent?.getTime() ?? 0) - (a.sent?.getTime() ?? 0);
  });

  return uniqueMessages ?? [];
};

export default getUniqueMessages;
