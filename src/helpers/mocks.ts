import { ContentTypeText } from "@xmtp/react-sdk";
import type { DecodedMessage, Stream, Conversation } from "@xmtp/react-sdk";

export const getMockConversation = (
  values?: Partial<Conversation>,
): Conversation => ({
  clientAddress: "",
  createdAt: new Date(),
  ephemeralTopic: "",
  peerAddress: "",
  topic: "",
  decodeMessage: () => Promise.resolve() as unknown as Promise<DecodedMessage>,
  messages: vi.fn().mockResolvedValue(["test1", "test2", "test3"]),
  messagesPaginated: () =>
    Promise.resolve() as unknown as AsyncGenerator<
      DecodedMessage[],
      any,
      unknown
    >,
  prepareMessage: () =>
    Promise.resolve() as unknown as ReturnType<Conversation["prepareMessage"]>,
  send: () => Promise.resolve() as unknown as Promise<DecodedMessage>,
  streamEphemeral: () =>
    Promise.resolve() as unknown as Promise<Stream<DecodedMessage>>,
  streamMessages: () =>
    Promise.resolve() as unknown as Promise<Stream<DecodedMessage>>,
  ...values,
});

type DecodedStringMessage = Omit<DecodedMessage, "content"> & {
  content: string;
};

export const getMockDecodedMessage = (
  values?: Partial<DecodedStringMessage>,
): DecodedStringMessage => ({
  id: "",
  messageVersion: "v2",
  senderAddress: "",
  recipientAddress: "",
  sent: new Date(),
  contentTopic: "",
  conversation: getMockConversation(),
  contentType: ContentTypeText,
  content: "",
  contentBytes: new TextEncoder().encode(values?.content ?? ""),
  toBytes: () => new TextEncoder().encode(""),
  ...values,
});
