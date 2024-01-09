import * as Delegation from "@ucanto/core/delegation";
import { CarReader } from "@ipld/car";

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

/** @param {string} data Base64 encoded CAR file */

export async function parseProof(data: string) {
  const blocks = [];
  const reader = await CarReader.fromBytes(Buffer.from(data, "base64"));
  for await (const block of reader.blocks()) {
    blocks.push(block);
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return Delegation.importDAG(blocks);
}
