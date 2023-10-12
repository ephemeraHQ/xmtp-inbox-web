import type { CachedMessage } from "@xmtp/react-sdk";
import { Interweave } from "interweave";
import { UrlMatcher } from "interweave-autolink";
import { EmojiMatcher, useEmojiData } from "interweave-emoji";
import type { MouseEvent } from "react";

export type TextMessageTileProps = {
  message: CachedMessage;
};

export const TextMessageTile: React.FC<TextMessageTileProps> = ({
  message,
}) => {
  const [, source] = useEmojiData({
    compact: false,
    shortcodes: ["emojibase"],
  });

  const content = message.content as string;

  return (
    <span className="interweave-content" data-testid="message-tile-text">
      <Interweave
        content={content}
        newWindow
        escapeHtml
        onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
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
};
