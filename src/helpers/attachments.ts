import { ATTACHMENT_ERRORS } from "./constants";

export const typeLookup: Record<string, contentTypes> = {
  jpg: "image",
  jpeg: "image",
  png: "image",
  gif: "image",
  webp: "image",
  quicktime: "video",
  mov: "video",
  mp4: "video",
  pdf: "application",
  doc: "application",
  wav: "audio",
};

/**
 * Returns a human readable file size string.
 *
 * @param bytes - The number of bytes.
 * @param si - Use SI units (KB, MB, GB) instead of binary (KiB, MiB, GiB). Default is false.
 * @param dp - Number of decimal places to display. Default is 1.
 * @returns The human readable file size string.
 */
export const humanFileSize = (bytes: number, si = false, dp = 1) => {
  // Throws error if > 10 MB
  if (bytes > 10000000) {
    return ATTACHMENT_ERRORS.FILE_TOO_LARGE;
  }
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return `${bytes} B`;
  }

  const units = ["KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  let u = -1;
  const r = 10 ** dp;

  let finalBytes = bytes;

  do {
    finalBytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(finalBytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return `${finalBytes.toFixed(dp)} ${units[u]}`;
};

/*
 * Returns the content type of a file based on its filename extension.
 *
 */

export type contentTypes =
  | "image"
  | "video"
  | "application"
  | "audio"
  | undefined;

export const getContentTypeFromFileName = (filename: string): contentTypes => {
  const suffix = filename.split?.(".")?.pop()?.toLowerCase();
  return suffix ? typeLookup[suffix] : undefined;
};
