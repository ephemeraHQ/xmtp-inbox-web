import { useCallback } from "react";
import { getConversationId, isValidLongWalletAddress } from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { address } from "../pages/inbox";
import {
  useSendMessage as useSendMessageHook,
  useStartConversation,
} from "@xmtp/react-sdk";
import { Conversation } from "@xmtp/react-sdk";
import {
  Attachment,
  RemoteAttachment,
  ContentTypeRemoteAttachment,
  RemoteAttachmentCodec,
} from "xmtp-content-type-remote-attachment";
import { AttachmentCodec } from "xmtp-content-type-remote-attachment";
import { Web3Storage } from "web3.storage";
import Upload from "../helpers/classes/Upload";
import { useTranslation } from "react-i18next";

const useSendMessage = (conversationId: address, attachment?: Attachment) => {
  const { t } = useTranslation();
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
    // persist a sent message to the local cache
    { persist: true },
  );
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const setConversations = useXmtpStore((state) => state.setConversations);

  const sendMessage = useCallback(
    async (message: string | Attachment, type: "text" | "attachment") => {
      if (attachment && type === "attachment") {
        const web3Storage = new Web3Storage({
          token: import.meta.env.VITE_WEB3_STORAGE_TOKEN as string,
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
              contentFallback:
                t("status_messaging.file_unsupported", {
                  FILENAME: remoteAttachment.filename,
                }) || remoteAttachment.filename,
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
            contentFallback:
              t("status_messaging.file_unsupported", {
                FILENAME: remoteAttachment.filename,
              }) || remoteAttachment.filename,
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
            message as string,
          );

          if (conversation) {
            selectedConversation = conversation;
            conversations.set(getConversationId(conversation), conversation);
            setConversations(new Map(conversations));
          }
        } else {
          await sendMessageFromHook(message as string);
        }
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
