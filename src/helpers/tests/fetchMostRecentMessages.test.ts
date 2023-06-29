import { vi, expect } from "vitest";
import fetchMostRecentMessage from "../fetchMostRecentMessage";
import { getMockConversation } from "../mocks";

const mockConvo = getMockConversation();

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
    mockConvo.messages = vi.fn().mockResolvedValue([]);
    const recentMessage = await fetchMostRecentMessage(mockConvo);
    expect(recentMessage).toMatchObject({ key: "" });
  });
});
