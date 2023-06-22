import { useClient } from "@xmtp/react-sdk";
import type { DecodedMessage } from "@xmtp/react-sdk";
import { useEffect } from "react";
import { fetchEnsName } from "@wagmi/core";
import { useAccount } from "wagmi";
import {
  getConversationId,
  shortAddress,
  truncate,
  fetchUnsName,
} from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import type { address } from "../pages/inbox";

let latestMsgId: string;

const useStreamAllMessages = () => {
  const { address: walletAddress } = useAccount();

  const { client } = useClient();

  const convoMessages = useXmtpStore((state) => state.convoMessages);
  const addMessages = useXmtpStore((state) => state.addMessages);
  const setPreviewMessage = useXmtpStore((state) => state.setPreviewMessage);

  useEffect(() => {
    if (!client) {
      return () => {};
    }

    let messageStream: AsyncGenerator<DecodedMessage>;

    const streamAllMessages = async () => {
      messageStream = await client?.conversations?.streamAllMessages();

      for await (const message of messageStream) {
        const key = getConversationId(message.conversation);
        setPreviewMessage(key, message);

        const numAdded = addMessages(key, [message]);
        if (numAdded > 0) {
          const newMessages = convoMessages.get(key) ?? [];
          newMessages.push(message);
          // Below code is to remove duplicate messages from the
          // newMessages array
          const uniqueMessages = [
            ...Array.from(
              new Map(newMessages.map((item) => [item.id, item])).values(),
            ),
          ];
          convoMessages.set(key, uniqueMessages);

          if (
            latestMsgId !== message.id &&
            Notification.permission === "granted" &&
            message.senderAddress !== walletAddress &&
            document.hidden
          ) {
            const ensName = await fetchEnsName({
              address: message.senderAddress as address,
            });
            const unsName = await fetchUnsName(message?.senderAddress);

            // eslint-disable-next-line no-new
            new Notification("XMTP", {
              body: `${
                ensName || unsName || shortAddress(message.senderAddress ?? "")
              }\n${truncate(message.content as string, 75)}`,
            });

            latestMsgId = message.id;
          }
        }
      }
    };

    const closeMessageStream = async () => {
      if (messageStream) {
        await messageStream.return(undefined);
      }
    };

    void streamAllMessages();

    return () => {
      void closeMessageStream();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, walletAddress]);
};

export default useStreamAllMessages;
