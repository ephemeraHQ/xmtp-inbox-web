import { ContentTypeRemoteAttachment } from "@xmtp/content-type-remote-attachment";
import type { CachedMessageWithId } from "@xmtp/react-sdk";
import { ContentTypeId, ContentTypeText } from "@xmtp/react-sdk";
import { ContentTypeReaction } from "@xmtp/content-type-reaction";

/**
 * Determines if a message is supported by the app
 */
export const isMessageSupported = (message: CachedMessageWithId) => {
  const contentType = ContentTypeId.fromString(message.contentType);
  return (
    contentType.sameAs(ContentTypeText) ||
    contentType.sameAs(ContentTypeRemoteAttachment) ||
    contentType.sameAs(ContentTypeReaction)
  );
};
