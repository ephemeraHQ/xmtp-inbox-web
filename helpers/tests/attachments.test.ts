import { humanFileSize } from "../attachments";
import { expect } from "@jest/globals";

describe("humanFileSize", () => {
  it("should return '0 B' for 0 bytes", () => {
    expect(humanFileSize(0)).toBe("0 B");
  });
  it("should return '1 KB' for 1024 bytes", () => {
    expect(humanFileSize(1024)).toBe("1.0 KB");
  });
  it("should return '1 MB' for 1048576 bytes", () => {
    expect(humanFileSize(1048576)).toBe("1.0 MB");
  });
  it("should throw an error if file is > 100 MB", () => {
    expect(() => humanFileSize(1000000001)).toThrowError("File too large!");
  });
});
