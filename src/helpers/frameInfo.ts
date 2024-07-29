import type { GetMetadataResponse } from "@open-frames/proxy-client";
import { PROTOCOL_VERSION } from "@xmtp/frames-client";

const OG_TITLE_TAG = "og:title";

export function isXmtpFrame(metadata: GetMetadataResponse): boolean {
  const minXmtpVersion = metadata.frameInfo?.acceptedClients?.xmtp;

  return (
    !!minXmtpVersion &&
    minXmtpVersion.length > 0 &&
    minXmtpVersion <= PROTOCOL_VERSION
  );
}

export function isValidFrame(
  metadata: GetMetadataResponse | undefined,
): metadata is Required<GetMetadataResponse> {
  if (!metadata) {
    return false;
  }

  // NOTE: This is more lenient than the Farcaster spec, which lists the og:image tag as required
  const hasImage = !!metadata.frameInfo?.image || !!metadata.frameInfo?.ogImage;

  return !!metadata?.frameInfo && hasImage;
}

export function getFrameTitle(metadata: GetMetadataResponse): string {
  return metadata.extractedTags[OG_TITLE_TAG] || "";
}
