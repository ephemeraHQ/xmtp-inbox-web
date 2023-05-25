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
  it("should return '1 GB' for 1073741824 bytes", () => {
    expect(humanFileSize(1073741824)).toBe("1.0 GB");
  });
  it("should return '1 TB' for 1099511627776 bytes", () => {
    expect(humanFileSize(1099511627776)).toBe("1.0 TB");
  });
  it("should return '1 PB' for 1125899906842624 bytes", () => {
    expect(humanFileSize(1125899906842624)).toBe("1.0 PB");
  });
  it("should return '1 EB' for 1152921504606846976 bytes", () => {
    expect(humanFileSize(1152921504606846976)).toBe("1.0 EB");
  });
  it("should return '1 ZB' for 1180591620717411303424 bytes", () => {
    expect(humanFileSize(1180591620717411303424)).toBe("1.0 ZB");
  });
  it("should return '1 YB' for 1208925819614629174706176 bytes", () => {
    expect(humanFileSize(1208925819614629174706176)).toBe("1.0 YB");
  });
});
