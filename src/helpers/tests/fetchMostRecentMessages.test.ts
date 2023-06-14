//@ts-nocheck
import { vi } from "vitest";
import fetchMostRecentMessage from "../fetchMostRecentMessage";

let mockConvo = {
  messages: vi.fn().mockResolvedValue(["test1", "test2", "test3"]),
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
    mockConvo.messages = vi.fn().mockResolvedValue([]);
    const recentMessage = await fetchMostRecentMessage(mockConvo);
    expect(recentMessage).toMatchObject({ key: "" });
  });
});
