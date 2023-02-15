//@ts-nocheck
import getUniqueMessages from "../getUniqueMessages";
import { expect } from "@jest/globals";

describe("getUniqueMessages", () => {
  it("returns unique messages in order provided if no timestamps", () => {
    const messageObj = [
      { id: "item1" },
      { id: "item2" },
      { id: "item3" },
      { id: "item1" },
    ];

    expect(getUniqueMessages(messageObj)).toMatchObject([
      { id: "item1" },
      { id: "item2" },
      { id: "item3" },
    ]);
  });
  it("returns unique messages with most recent sent back if timestamps and duplicates", () => {
    const messageObj = [
      {
        id: "item1",
        sent: {
          getTime: () => {
            const date = new Date().setHours(10);
            return date;
          },
        },
      },
      {
        id: "item2",
        sent: {
          getTime: () => {
            const date = new Date().setHours(8);
            return date;
          },
        },
      },
      {
        id: "item3",
        sent: {
          getTime: () => {
            const date = new Date().setHours(2);
            return date;
          },
        },
      },
      {
        id: "item1",
        sent: {
          getTime: () => {
            const date = new Date().setHours(1);
            return date;
          },
        },
      },
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
