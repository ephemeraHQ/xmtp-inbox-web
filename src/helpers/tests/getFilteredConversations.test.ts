//@ts-nocheck
import { XMTP_FEEDBACK_ADDRESS } from "../constants";
import getFilteredConversations from "../getFilteredConversations";
import { expect } from "@jest/globals";

let mockConversations = new Map();

mockConversations.set("key1", {
  peerAddress: XMTP_FEEDBACK_ADDRESS,
  value: "test1",
});
mockConversations.set("key2", {
  peerAddress: "address2",
  value: "test2",
});
mockConversations.set("key3", {
  peerAddress: "address3",
  value: "test3",
});

describe("getFilteredConversations", () => {
  it("returns most recent message with multiple messages", async () => {
    const xmtpConvo = await getFilteredConversations(mockConversations);
    expect(xmtpConvo.length).toEqual(2);
  });
});
