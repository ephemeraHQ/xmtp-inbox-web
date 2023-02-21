import { classNames } from "../classNames";
import { expect } from "@jest/globals";

describe("classNames", () => {
  it("should return a string of class names", () => {
    expect(classNames("class1", "class2", "class3")).toBe(
      "class1 class2 class3",
    );
  });
  it("should remove null values", () => {
    expect(classNames("class1", null, "class2")).toBe("class1 class2");
  });
  it("should return an empty string with empty input", () => {
    expect(classNames()).toBe("");
  });
});
