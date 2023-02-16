//@ts-nocheck
import fetchMostRecentMessage from "../fetchMostRecentMessage";
import { expect } from "@jest/globals";

let mockConvo = {
  messages: jest.fn().mockResolvedValue(["test1", "test2", "test3"]),
};

describe("fetchMostRecentMessage", () => {
  it("returns most recent message with multiple messages", async () => {
    const recentMessage = await fetchMostRecentMessage(mockConvo);
    expect(recentMessage).toMatchObject({ key: "", message: "test1" });
  });
  it("handles falsey input by just returning key", async () => {
    const recentMessage = await fetchMostRecentMessage(undefined);
    expect(recentMessage).toMatchObject({ key: "" });
  });
  it("returns just key when no new messages", async () => {
    mockConvo.messages = jest.fn().mockResolvedValue([]);
    const recentMessage = await fetchMostRecentMessage(mockConvo);
    expect(recentMessage).toMatchObject({ key: "" });
  });
});
