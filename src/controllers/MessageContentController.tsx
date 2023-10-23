import { Interweave } from "interweave";
import { UrlMatcher } from "interweave-autolink";
import { EmojiMatcher, useEmojiData } from "interweave-emoji";
import type { MouseEvent } from "react";
import { ContentTypeRemoteAttachment } from "@xmtp/content-type-remote-attachment";
import { ContentTypeReply } from "@xmtp/content-type-reply";
import {
  ContentTypeId,
  type CachedMessage,
  ContentTypeText,
} from "@xmtp/react-sdk";
import RemoteAttachmentMessageTile from "../component-library/components/RemoteAttachmentMessageTile/RemoteAttachmentMessageTile";

interface MessageContentControllerProps {
  message: CachedMessage;
  isSelf: boolean;
}

const MessageContentController = ({
  message,
  isSelf,
}: MessageContentControllerProps) => {
  const [, source] = useEmojiData({
    compact: false,
    shortcodes: ["emojibase"],
  });

  const contentType = ContentTypeId.fromString(message.contentType);

  if (contentType.sameAs(ContentTypeText)) {
    const content = message.content as string;
    return (
      <span className="interweave-content" data-testid="message-tile-text">
        <Interweave
          content={content}
          newWindow
          escapeHtml
          onClick={(event: MouseEvent<HTMLDivElement>) =>
            event.stopPropagation()
          }
          matchers={[
            new UrlMatcher("url"),
            new EmojiMatcher("emoji", {
              convertEmoticon: true,
              convertShortcode: true,
              renderUnicode: true,
            }),
            // Commenting out email matching until this issue is resolved: https://github.com/milesj/interweave/issues/201
            // In the meantime, the experience still properly displays emails, just doesn't link to the expected `mailto:` view.
            // new EmailMatcher("email"),
          ]}
          emojiSource={source}
        />
      </span>
    );
  }

  if (contentType.sameAs(ContentTypeRemoteAttachment)) {
    return <RemoteAttachmentMessageTile message={message} isSelf={isSelf} />;
  }

  if (contentType.sameAs(ContentTypeReply)) {
    const newMessage = {
      ...message,
      content: message.content.content,
      contentType: message.content.contentType?.typeId
        ? `${message.content.contentType.typeId}:1.0`
        : "",
    };

    return <MessageContentController message={newMessage} isSelf={isSelf} />;
  }

  // message content type not supported, display fallback
  return <span>{message.contentFallback}</span>;
};

export default MessageContentController;
