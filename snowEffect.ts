/* eslint-disable class-methods-use-this */
import { ContentTypeId } from "@xmtp/xmtp-js";
import type { ContentCodec, EncodedContent } from "@xmtp/xmtp-js";

export const ContentTypeTextEffect = new ContentTypeId({
  authorityId: "xmtp.chat",
  typeId: "textEffect",
  versionMajor: 1,
  versionMinor: 0,
});

export type TextEffect = {
  messageId: string;
  topic: string;
  effectType: "SNOW" | "RAIN";
};

export type TextEffectParameters = Pick<
  TextEffect,
  "messageId" | "topic" | "effectType"
>;

export class TextEffectCodec implements ContentCodec<TextEffect | undefined> {
  get contentType(): ContentTypeId {
    return ContentTypeTextEffect;
  }

  encode(content: TextEffect): EncodedContent<TextEffectParameters> {
    return {
      type: ContentTypeTextEffect,
      parameters: {
        messageId: content.messageId,
        topic: content.topic,
        effectType: content.effectType,
      },
      content: new Uint8Array(),
    };
  }

  decode(
    content: EncodedContent<TextEffectParameters>,
  ): TextEffect | undefined {
    const { messageId, topic, effectType } = content.parameters;

    return {
      messageId,
      topic,
      effectType,
    };
  }

  fallback() {
    return undefined;
  }
}
