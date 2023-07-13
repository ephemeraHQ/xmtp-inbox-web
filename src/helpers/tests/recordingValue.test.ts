import { expect } from "vitest";
import { getRecordingValue } from "../recordingValue";

describe("getRecordingValue", () => {
  it("should return formatted string when status is recording", () => {
    const result = getRecordingValue("recording", 9, 19, "Recording");
    expect(result).toBe("Recording (09:19)");
  });

  it("should pad minutes and seconds with zeros when needed", () => {
    const result = getRecordingValue("recording", 1, 2, "Test");
    expect(result).toBe("Test (01:02)");
  });

  it("should return null when status is not recording", () => {
    const result = getRecordingValue("stopped", 5, 7, "Recording");
    expect(result).toBeNull();
  });
});
