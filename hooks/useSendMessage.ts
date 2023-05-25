import { useCallback } from "react";
import { getConversationId, isValidLongWalletAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { address } from "../pages/inbox";
import { emitMsgSentEvent } from "../helpers/internalTracking";
import {
  useSendMessage as useSendMessageHook,
  useStartConversation,
} from "@xmtp/react-sdk";
import { Conversation } from "@xmtp/react-sdk";
import {
  Attachment,
  RemoteAttachment,
  ContentTypeRemoteAttachment,
} from "xmtp-content-type-remote-attachment";
import { AttachmentCodec } from "xmtp-content-type-remote-attachment";
import { Web3Storage } from "web3.storage";
import { RemoteAttachmentCodec } from "../classes/RemoteAttachment";
import Upload from "../classes/Upload";

const useSendMessage = (conversationId: address, attachment?: Attachment) => {
  const conversations = useXmtpStore((state) => state.conversations);
  let selectedConversation = conversations.get(conversationId);
  const { startConversation, error, isLoading } = useStartConversation<
    RemoteAttachment | string
  >();
  const {
    sendMessage: sendMessageFromHook,
    isLoading: sendingMessageLoading,
    error: sendingMessageError,
  } = useSendMessageHook<RemoteAttachment | string>(
    selectedConversation as Conversation,
  );
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const setConversations = useXmtpStore((state) => state.setConversations);

  const sendMessage = useCallback(
    async (message: string) => {
      if (attachment) {
        const web3Storage = new Web3Storage({
          token: process.env.NEXT_PUBLIC_WEB3_STORAGE_TOKEN as string,
        });

        const encryptedEncoded = await RemoteAttachmentCodec.encodeEncrypted(
          attachment,
          new AttachmentCodec(),
        );

        const upload = new Upload(
          "XMTPEncryptedContent",
          encryptedEncoded.payload,
        );

        const cid = await web3Storage.put([upload]);
        const url = `https://${cid}.ipfs.w3s.link/XMTPEncryptedContent`;

        console.log(`url is`, url);

        const remoteAttachment: RemoteAttachment = {
          url: url,
          contentDigest: encryptedEncoded.digest,
          salt: encryptedEncoded.salt,
          nonce: encryptedEncoded.nonce,
          secret: encryptedEncoded.secret,
          scheme: "https://",
          filename: attachment.filename,
          contentLength: attachment.data.byteLength,
        };
        let selectedConversation = conversations.get(conversationId);
        if (
          isValidLongWalletAddress(recipientWalletAddress) &&
          (!selectedConversation || !selectedConversation?.messages)
        ) {
          const conversation = await startConversation(
            recipientWalletAddress,
            remoteAttachment,
            {
              contentFallback: message,
              contentType: ContentTypeRemoteAttachment,
            },
          );
          if (conversation) {
            selectedConversation = conversation;
            conversations.set(getConversationId(conversation), conversation);
            setConversations(new Map(conversations));
          }
        } else {
          await sendMessageFromHook(remoteAttachment, {
            contentFallback: message,
            contentType: ContentTypeRemoteAttachment,
          });
        }
      } else {
        let selectedConversation = conversations.get(conversationId);
        if (
          isValidLongWalletAddress(recipientWalletAddress) &&
          (!selectedConversation || !selectedConversation?.messages)
        ) {
          const conversation = await startConversation(
            recipientWalletAddress,
            message,
          );

          if (conversation) {
            selectedConversation = conversation;
            conversations.set(getConversationId(conversation), conversation);
            setConversations(new Map(conversations));
          }
        } else {
          await sendMessageFromHook(message);
        }

        /* The emitMsgSentEvent function is called only when
            specific XMTP Labs team wallets use
            the internal domain alpha.xmtp.chat. This
            tracking is temporary and meant to help
            surface insights about team usage to
            help build a better app. */
        await emitMsgSentEvent(
          // @ts-expect-error: Property 'client' does not exist on type 'Conversation'
          selectedConversation?.client.address,
          recipientWalletAddress as address,
        );
      }
    },
    [conversationId, recipientWalletAddress, conversations, attachment],
  );

  return {
    sendMessage,
    loading: isLoading || sendingMessageLoading,
    error: error || sendingMessageError,
  };
};

export default useSendMessage;
