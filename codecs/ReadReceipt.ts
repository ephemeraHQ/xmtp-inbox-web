import { ContentCodec, ContentTypeId, EncodedContent } from "@xmtp/xmtp-js"
import { CodecRegistry } from "@xmtp/xmtp-js/dist/types/src/MessageContent"

export const ContentTypeReadReceipt = new ContentTypeId({
    authorityId: "xmtp.org",
    typeId: "read-receipt",
    versionMajor: 1,
    versionMinor: 0,
})

export type ReadReceipt = {
    messageId: string
    status: string
}

export class ReadReceiptCodec implements ContentCodec<ReadReceipt> {
    get contentType(): ContentTypeId {
        return ContentTypeReadReceipt
    }

    encode(content: ReadReceipt, registry: CodecRegistry): EncodedContent {
        if (content.status !== "DELIVERED" && content.status !== "SEEN") {
            throw new Error("status is not valid")
        }

        return {
            type: ContentTypeReadReceipt,
            parameters: {
                messageId: content.messageId,
            },
            content: new TextEncoder().encode(content.status),
        }
    }

    decode(content: EncodedContent, registry: CodecRegistry): ReadReceipt {
        return {
            messageId: content.parameters.messageId,
            status: new TextDecoder().decode(content.content),
        }
    }
}
