import { Interweave } from 'interweave'
import { EmailMatcher, UrlMatcher } from 'interweave-autolink'
import { EmojiMatcher, useEmojiData } from 'interweave-emoji';
import type { FC, MouseEvent } from 'react';

const InterweaveContent = ({ content }: { content: string }) => {
    const [emojis, source, manager] = useEmojiData({ compact: false, shortcodes: ['emojibase'] });
    return (
        <span className="interweave-content">
            <Interweave
                content={content}
                newWindow
                escapeHtml
                onClick={(event: MouseEvent<HTMLDivElement>) => event.stopPropagation()}
                matchers={[
                    new UrlMatcher('url', { validateTLD: false }),
                    new EmojiMatcher('emoji', {
                        convertEmoticon: true,
                        convertShortcode: true,
                        renderUnicode: true,
                    }),
                    new EmailMatcher('email')]}
                emojiSource={source}
            />
        </span>
    )
}

export default InterweaveContent