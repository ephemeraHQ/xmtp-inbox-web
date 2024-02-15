import type { CachedConversation, CachedMessageWithId } from "@xmtp/react-sdk";
import { Client, useClient } from "@xmtp/react-sdk";
import { FramesClient } from "@xmtp/frames-client";
import { useEffect, useState } from "react";
import type { PrivateKeyAccount, Transport, WalletClient } from "viem";
import type { mainnet } from "wagmi";
import { useWalletClient } from "wagmi";
import { FullMessage } from "../component-library/components/FullMessage/FullMessage";
import { classNames, shortAddress } from "../helpers";
import MessageContentController from "./MessageContentController";
import { useXmtpStore } from "../store/xmtp";
import { Frame } from "../component-library/components/Frame/Frame";
import { getFrameInfo } from "../helpers/getFrameInfo";
import { readMetadata } from "../helpers/openFrames";

interface FullMessageControllerProps {
  message: CachedMessageWithId;
  conversation: CachedConversation;
  isReply?: boolean;
}

export type FrameInfo = {
  image: string;
  title: string;
  buttons: string[];
  postUrl: string;
};

export const FullMessageController = ({
  message,
  conversation,
  isReply,
}: FullMessageControllerProps) => {
  const { client } = useClient();
  const { data: walletClient } = useWalletClient();

  const conversationTopic = useXmtpStore((state) => state.conversationTopic);

  const [frameInfo, setFrameInfo] = useState<FrameInfo | undefined>(undefined);
  const [frameButtonUpdating, setFrameButtonUpdating] = useState<number>(0);

  const handleFrameButtonClick = async (buttonIndex: number) => {
    if (!frameInfo) {
      return;
    }
    const frameUrl = frameInfo.image;

    setFrameButtonUpdating(buttonIndex);

    const xmtpClient = await Client.create(
      walletClient as WalletClient<
        Transport,
        typeof mainnet,
        PrivateKeyAccount
      >,
    );
    const framesClient = new FramesClient(xmtpClient);

    const payload = await framesClient.signFrameAction({
      frameUrl,
      buttonIndex,
      conversationTopic: conversationTopic as string,
      participantAccountAddresses: [
        client?.address as string,
        conversation.peerAddress,
      ],
    });

    const updatedFrameMetadata = await framesClient.proxy.post(
      frameInfo.postUrl,
      payload,
    );
    const updatedFrameInfo = getFrameInfo(updatedFrameMetadata.extractedTags);

    setFrameInfo(updatedFrameInfo);
    setFrameButtonUpdating(0);
  };

  useEffect(() => {
    if (typeof message.content === "string") {
      const words = message.content?.split(/(\r?\n|\s+)/);
      const urlRegex =
        /^(http[s]?:\/\/)?([a-z0-9.-]+\.[a-z0-9]{1,}\/.*|[a-z0-9.-]+\.[a-z0-9]{1,})$/i;

      void Promise.all(
        words.map(async (word) => {
          const isUrl = !!word.match(urlRegex)?.[0];

          if (isUrl) {
            const metadata = await readMetadata(word);
            if (metadata) {
              const info = getFrameInfo(metadata.extractedTags);
              setFrameInfo(info);
            }
          }
        }),
      );
    }
  }, [message?.content]);

  const recipientName = useXmtpStore((s) => s.recipientName);
  const alignmentStyles =
    client?.address === message.senderAddress
      ? "items-end justify-end"
      : "items-start justify-start";

  return (
    <div
      className={classNames(
        "flex flex-col w-full px-4 md:px-8",
        alignmentStyles,
      )}>
      <FullMessage
        isReply={isReply}
        message={message}
        conversation={conversation}
        key={message.xmtpID}
        from={{
          displayAddress: recipientName ?? shortAddress(message.senderAddress),
          isSelf: client?.address === message.senderAddress,
        }}
        datetime={message.sentAt}>
        <MessageContentController
          message={message}
          isSelf={client?.address === message.senderAddress}
        />
      </FullMessage>
      {frameInfo?.image && (
        <Frame
          image={frameInfo.image}
          title={frameInfo.title}
          buttons={frameInfo.buttons}
          handleClick={handleFrameButtonClick}
          frameButtonUpdating={frameButtonUpdating}
        />
      )}
    </div>
  );
};
