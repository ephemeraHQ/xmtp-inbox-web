import { useStreamAllMessages as _useStreamAllMessages } from "@xmtp/react-sdk";
import type { DecodedMessage } from "@xmtp/react-sdk";
import { useCallback, useRef } from "react";
import { fetchEnsName } from "@wagmi/core";
import { useAccount } from "wagmi";
import { shortAddress, truncate, fetchUnsName } from "../helpers";
import type { address } from "../pages/inbox";

const useStreamAllMessages = () => {
  const { address: walletAddress } = useAccount();
  const latestMsgId = useRef<string>();

  const onMessage = useCallback(
    async (message: DecodedMessage) => {
      if (
        latestMsgId.current !== message.id &&
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

        latestMsgId.current = message.id;
      }
    },
    [walletAddress],
  );

  void _useStreamAllMessages(onMessage);
};

export default useStreamAllMessages;
