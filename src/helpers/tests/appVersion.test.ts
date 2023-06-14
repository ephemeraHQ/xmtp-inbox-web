import { vi } from "vitest";

vi.mock("../../../package.json", () => ({
  default: {
    name: "testName",
    version: "1",
  },
}));

const { getAppVersion } = await import("../appVersion");

describe("getAppVersion", () => {
  it("returns app version and name in package json", () => {
    expect(getAppVersion()).toBe("testName/1");
  });
  // No edge case check here due to those being required fields in a public package.json.
});
