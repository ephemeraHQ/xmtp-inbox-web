import { expect } from "vitest";
import { isAppEnvDemo } from "../env";
import { ENVIRONMENT } from "../constants";

describe("isAppEnvDemo", () => {
  it("returns false if local storage does not have a key of demo", () => {
    expect(isAppEnvDemo()).toBe(false);
  });
  it("returns true if local storage has a key of demo with value of stringified true", () => {
    window.localStorage.setItem(ENVIRONMENT.DEMO, String(true));
    expect(isAppEnvDemo()).toBe(true);
  });
  it("returns false if local storage has a key of demo with unexpected value", () => {
    window.localStorage.setItem(ENVIRONMENT.DEMO, String(false));
    expect(isAppEnvDemo()).toBe(false);
  });
  it("returns false if hostname does not include demo when empty local storage", () => {
    window.localStorage.clear();
    expect(isAppEnvDemo()).toBe(false);
  });
});
