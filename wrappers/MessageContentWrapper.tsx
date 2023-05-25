import { Interweave } from "interweave";
import { EmailMatcher, UrlMatcher } from "interweave-autolink";
import { EmojiMatcher, useEmojiData } from "interweave-emoji";
import type { MouseEvent } from "react";
import React from "react";
import RemoteAttachmentMessageTile from "../component-library/components/RemoteAttachmentMessageTile/RemoteAttachmentMessageTile";
import { RemoteAttachment } from "xmtp-content-type-remote-attachment";

interface MessageContentWrapperProps {
  content: string | RemoteAttachment;
  isSelf: boolean;
  isLoading: boolean;
  isError: boolean;
}

const MessageContentWrapper = ({
  content,
  isSelf,
  isLoading,
  isError,
}: MessageContentWrapperProps) => {
  const [, source] = useEmojiData({
    compact: false,
    shortcodes: ["emojibase"],
  });

  return typeof content !== "string" && content.url ? (
    <RemoteAttachmentMessageTile
      content={content}
      isSelf={isSelf}
      isLoading={isLoading}
      isError={isError}
    />
  ) : (
    <span className="interweave-content" data-testid="message-tile-text">
      <Interweave
        content={content as string}
        newWindow
        escapeHtml
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
        matchers={[
          new UrlMatcher("url", { validateTLD: false }),
          new EmojiMatcher("emoji", {
            convertEmoticon: true,
            convertShortcode: true,
            renderUnicode: true,
          }),
          new EmailMatcher("email"),
        ]}
        emojiSource={source}
      />
    </span>
  );
};

export default MessageContentWrapper;
