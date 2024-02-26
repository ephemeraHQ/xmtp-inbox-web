import type { CachedConversation, CachedMessageWithId } from "@xmtp/react-sdk";
import { useClient } from "@xmtp/react-sdk";
import { FramesClient } from "@xmtp/frames-client";
import { useEffect, useState } from "react";
import type { GetMetadataResponse } from "@open-frames/proxy-client";
import { FullMessage } from "../component-library/components/FullMessage/FullMessage";
import { classNames, shortAddress } from "../helpers";
import MessageContentController from "./MessageContentController";
import { useXmtpStore } from "../store/xmtp";
import { Frame } from "../component-library/components/Frame/Frame";
import { readMetadata } from "../helpers/openFrames";
import type { FrameButton } from "../helpers/frameInfo";
import {
  getFrameTitle,
  getOrderedButtons,
  isValidFrame,
  isXmtpFrame,
} from "../helpers/frameInfo";

interface FullMessageControllerProps {
  message: CachedMessageWithId;
  conversation: CachedConversation;
  isReply?: boolean;
}

export const FullMessageController = ({
  message,
  conversation,
  isReply,
}: FullMessageControllerProps) => {
  const { client } = useClient();

  const conversationTopic = useXmtpStore((state) => state.conversationTopic);

  const [frameMetadata, setFrameMetadata] = useState<
    GetMetadataResponse | undefined
  >(undefined);
  const [frameButtonUpdating, setFrameButtonUpdating] = useState<number>(0);
  const [textInputValue, setTextInputValue] = useState<string>("");

  const handleFrameButtonClick = async (
    buttonIndex: number,
    action: FrameButton["action"] = "post",
  ) => {
    if (!frameMetadata || !client || !frameMetadata?.frameInfo?.buttons) {
      return;
    }
    const { frameInfo, url: frameUrl } = frameMetadata;
    if (!frameInfo.buttons) {
      return;
    }
    const button = frameInfo.buttons[`${buttonIndex}`];

    setFrameButtonUpdating(buttonIndex);

    const framesClient = new FramesClient(client);
    const postUrl = button.target || frameInfo.postUrl || frameUrl;
    const payload = await framesClient.signFrameAction({
      frameUrl,
      inputText: textInputValue || undefined,
      buttonIndex,
      conversationTopic: conversationTopic as string,
      participantAccountAddresses: [client.address, conversation.peerAddress],
    });

    if (action === "post") {
      const updatedFrameMetadata = await framesClient.proxy.post(
        postUrl,
        payload,
      );
      setFrameMetadata(updatedFrameMetadata);
    } else if (action === "post_redirect") {
      const { redirectedTo } = await framesClient.proxy.postRedirect(
        postUrl,
        payload,
      );
      window.open(redirectedTo, "_blank");
    } else if (action === "link" && button?.target) {
      window.open(button.target, "_blank");
    }
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
              setFrameMetadata(metadata);
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

  const showFrame = isValidFrame(frameMetadata);

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
      {showFrame && (
        <Frame
          image={frameMetadata?.frameInfo?.image.content}
          title={getFrameTitle(frameMetadata)}
          buttons={getOrderedButtons(frameMetadata)}
          handleClick={handleFrameButtonClick}
          frameButtonUpdating={frameButtonUpdating}
          interactionsEnabled={isXmtpFrame(frameMetadata)}
          textInput={frameMetadata?.frameInfo?.textInput?.content}
          onTextInputChange={setTextInputValue}
        />
      )}
    </div>
  );
};
