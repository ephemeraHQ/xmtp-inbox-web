/* eslint-disable class-methods-use-this */
import { ContentTypeId } from "@xmtp/xmtp-js";
import type { ContentCodec, EncodedContent } from "@xmtp/xmtp-js";

export const ContentTypeCustom = new ContentTypeId({
  authorityId: "NaomiAndDaria",
  typeId: "custom",
  versionMajor: 1,
  versionMinor: 0,
});

export type Custom = {
  // Keeping a param here in case we want to do something with an input
  name: string;
};

export type CustomParameters = Pick<Custom, "name">;

export class CustomCodec implements ContentCodec<Custom> {
  get contentType(): ContentTypeId {
    return ContentTypeCustom;
  }

  encode(content: Custom): EncodedContent<CustomParameters> {
    return {
      type: ContentTypeCustom,
      parameters: {
        name: content.name,
      },
      content: new Uint8Array(),
    };
  }

  decode(content: EncodedContent<CustomParameters>): Custom {
    // Just keeping this param here should we want to use an input
    const { name } = content.parameters;

    // // Currently, this will change the background of any of the message tile containers to be blue when this is sent
    document.querySelectorAll("#message-tile-container").forEach((el) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      el.style.backgroundColor = "purple";
    });

    return {
      name,
    };
  }

  fallback() {
    return undefined;
  }
}
