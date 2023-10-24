import { ContentTypeRemoteAttachment } from "@xmtp/content-type-remote-attachment";
import type { CachedMessageWithId } from "@xmtp/react-sdk";
import { ContentTypeId, ContentTypeText } from "@xmtp/react-sdk";

/**
 * Determines if a message is supported by the app
 */
export const isMessageSupported = (message: CachedMessageWithId) => {
  const contentType = ContentTypeId.fromString(message.contentType);
  return (
    contentType.sameAs(ContentTypeText) ||
    contentType.sameAs(ContentTypeRemoteAttachment)
  );
};
