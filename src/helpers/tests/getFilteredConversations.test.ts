import { expect } from "vitest";
import type { Conversation } from "@xmtp/react-sdk";
import { XMTP_FEEDBACK_ADDRESS } from "../constants";
import getFilteredConversations from "../getFilteredConversations";
import { getMockConversation } from "../mocks";

const mockConversations = new Map<string, Conversation>();

mockConversations.set(
  "key1",
  getMockConversation({
    peerAddress: XMTP_FEEDBACK_ADDRESS,
  }),
);
mockConversations.set(
  "key2",
  getMockConversation({
    peerAddress: "address2",
  }),
);
mockConversations.set(
  "key3",
  getMockConversation({
    peerAddress: "address3",
  }),
);

describe("getFilteredConversations", () => {
  it("returns most recent message with multiple messages", () => {
    const xmtpConvo = getFilteredConversations(mockConversations);
    expect(xmtpConvo.length).toEqual(2);
  });
});
