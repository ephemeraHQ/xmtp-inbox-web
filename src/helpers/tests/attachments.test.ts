import { getContentTypeFromFileName, humanFileSize } from "../attachments";
import { ATTACHMENT_ERRORS } from "../constants";

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
  it("should throw an error if file is > 5 MB", () => {
    expect(humanFileSize(5000001)).toBe(ATTACHMENT_ERRORS.FILE_TOO_LARGE);
  });
});

describe("getContentTypeFromFileName", () => {
  test("should return image for .jpg extension", () => {
    expect(getContentTypeFromFileName("file.jpg")).toEqual("image");
  });

  test("should return video for .mp4 extension", () => {
    expect(getContentTypeFromFileName("video.mp4")).toEqual("video");
  });

  test("should return application for .pdf extension", () => {
    expect(getContentTypeFromFileName("document.pdf")).toEqual("application");
  });

  test("should return undefined for no extension", () => {
    expect(getContentTypeFromFileName("file")).toEqual(undefined);
  });

  test("should return undefined for invalid extension", () => {
    expect(getContentTypeFromFileName("file.xyz")).toEqual(undefined);
  });
});
