//@ts-nocheck
import {
  isEnsAddress,
  getConversationId,
  shortAddress,
  truncate,
  isValidRecipientAddressFormat,
  getAddress,
} from "../string";
import { expect } from "@jest/globals";
import { utils } from "ethers";

describe("truncate", () => {
  it("should return the original string if its length is less than the length param", () => {
    expect(truncate("123 string", 10)).toBe("123 string");
  });
  it("should return a truncated string if its length is greater than the length param", () => {
    expect(truncate("123 string", 6)).toBe("123...");
  });
  it("should return an empty string for unexpected string input", () => {
    expect(truncate(undefined, 3)).toBe("");
  });
});

describe("isEnsAddress", () => {
  it("should return true if address ends with .eth", () => {
    expect(isEnsAddress("test.eth")).toBe(true);
  });
  it("should return false if address does not include eth", () => {
    expect(isEnsAddress("01201209483434")).toBe(false);
  });
  it("should return false if address includes but does not end with .eth", () => {
    expect(isEnsAddress("test.noteth")).toBe(false);
    expect(isEnsAddress("eth.test")).toBe(false);
  });
  it("should return false if invalid address", () => {
    expect(isEnsAddress("")).toBe(false);
  });
  it("should return true for cb.id addresses", () => {
    expect(isEnsAddress("test.cb.id")).toBe(true);
  });

  describe("shortAddress", () => {
    it("should return properly formatted address with long addresses that start with 0x", () => {
      const address = "0x3843594754958459849584232930";
      expect(shortAddress(address)).toBe("0x3843...2930");
    });
    it("should not format long addresses that do not start with 0x", () => {
      const address = "123843594754958459849584232930";
      expect(shortAddress(address)).toBe(address);
    });
    it("should not format short addresses that start with 0x", () => {
      const address = "0xabc";
      expect(shortAddress(address)).toBe(address);
    });
    it("should not format short addresses that do not start with 0x", () => {
      const address = "abc";
      expect(shortAddress(address)).toBe(address);
    });
    it("should handle empty string inputs by returning an empty string", () => {
      expect(shortAddress("")).toBe("");
    });
  });
});

describe("getConversationId", () => {
  let conversation = {
    context: {
      conversationId: "testConversationId",
    },
    peerAddress: "testPeerAddress",
  };
  it("should send back formatted conversation key if conversation id exists", () => {
    expect(getConversationId(conversation)).toBe(
      "testPeerAddress/testConversationId",
    );
  });
  it("should send back peer address only if conversation key if conversation id does not exist", () => {
    conversation.context.conversationId = undefined;
    expect(getConversationId(conversation)).toBe("testPeerAddress");
  });
  it("should handle falsey inputs by returning empty string", () => {
    let conversation = undefined;
    expect(getConversationId(conversation)).toBe("");
  });
});

describe("isValidRecipientAddressFormat", () => {
  it("should return true if address ends with .eth", () => {
    expect(isValidRecipientAddressFormat("test.eth")).toBe(true);
  });
  it("should return true if address starts with 0x and is the right length", () => {
    expect(
      isValidRecipientAddressFormat(
        "0x1234567890123456789012345678901234567890",
      ),
    ).toBe(true);
  });
  it("should return false if address starts with 0x and is not the right length", () => {
    expect(isValidRecipientAddressFormat("0xwrongLength")).toBe(false);
  });
  it("should return false if invalid address", () => {
    expect(isValidRecipientAddressFormat("")).toBe(false);
  });
});

describe("getAddress", () => {
  it("should return a valid checksum'd address if conversationId is in expected format", () => {
    const conversationId = "0x78bfd39428c32be149892d64bee6c6f90aedeec1";
    expect(getAddress(conversationId)).toBe(utils.getAddress(conversationId));
  });
  it("should return the input if conversationId is not in expected format", () => {
    const conversationId =
      "0x78bfd39428c32be149892d64bee6c6f90aedeec1/lens.dev/dm/12345";

    expect(getAddress(conversationId)).toBe(conversationId);
  });
  it("should handle empty string input and return empty string", () => {
    expect(getAddress("")).toBe("");
  });
});
