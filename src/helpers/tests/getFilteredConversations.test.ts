import { expect } from "vitest";
import { XMTP_FEEDBACK_ADDRESS } from "../constants";
import getFilteredConversations from "../getFilteredConversations";
import { getMockConversation } from "../mocks";

const mockConversations = [
  getMockConversation({ topic: "topic1", peerAddress: XMTP_FEEDBACK_ADDRESS }),
  getMockConversation({ topic: "topic2", peerAddress: "address2" }),
  getMockConversation({ topic: "topic3", peerAddress: "address3" }),
];

describe("getFilteredConversations", () => {
  it("returns most recent message with multiple messages", () => {
    const xmtpConvo = getFilteredConversations(mockConversations);
    expect(xmtpConvo.length).toEqual(2);
  });
});
