import { expect } from "vitest";
import { setHours } from "date-fns";
import getUniqueMessages from "../getUniqueMessages";
import { getMockDecodedMessage } from "../mocks";

describe("getUniqueMessages", () => {
  it("returns unique messages in order provided if no timestamps", () => {
    const messageObj = [
      getMockDecodedMessage({ id: "item1" }),
      getMockDecodedMessage({ id: "item2" }),
      getMockDecodedMessage({ id: "item3" }),
      getMockDecodedMessage({ id: "item1" }),
    ];

    expect(getUniqueMessages(messageObj)).toMatchObject([
      { id: "item1" },
      { id: "item2" },
      { id: "item3" },
    ]);
  });

  it("returns unique messages with most recent sent back if timestamps and duplicates", () => {
    const mockDate = new Date();

    const messageObj = [
      getMockDecodedMessage({ id: "item1", sent: setHours(mockDate, 10) }),
      getMockDecodedMessage({ id: "item2", sent: setHours(mockDate, 8) }),
      getMockDecodedMessage({ id: "item3", sent: setHours(mockDate, 2) }),
      getMockDecodedMessage({ id: "item1", sent: setHours(mockDate, 1) }),
    ];

    expect(getUniqueMessages(messageObj)[0].id).toBe("item2");
    expect(getUniqueMessages(messageObj)[1].id).toBe("item3");
    expect(getUniqueMessages(messageObj)[2].id).toBe("item1");
  });

  it("returns empty array if empty input", () => {
    expect(getUniqueMessages(undefined)).toMatchObject([]);
  });
});

export default getUniqueMessages;
