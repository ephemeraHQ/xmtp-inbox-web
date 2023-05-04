import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { isEnsAddress, isValidRecipientAddressFormat } from "../../helpers";
import { useXmtpStore } from "../../store/xmtp";
import { fetchEnsAddress } from "@wagmi/core";

const DmPage: NextPage = () => {
  const router = useRouter();

  const setConversationId = useXmtpStore((state) => state.setConversationId);
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );

  const [recipientWalletAddr, setRecipientWalletAddr] = useState<string>();

  useEffect(() => {
    if (router.query.recipientWalletAddr)
      setRecipientWalletAddr(router.query.recipientWalletAddr as string);
  }, [router.query.recipientWalletAddr]);

  useEffect(() => {
    const routeToInbox = async () => {
      if (recipientWalletAddr) {
        let recipient = recipientWalletAddr as string;
        if (isValidRecipientAddressFormat(recipient)) {
          if (isEnsAddress(recipient)) {
            recipient =
              (await fetchEnsAddress({
                name: recipient,
              })) ?? "";
          }
          setConversationId(recipient);
          setRecipientWalletAddress(recipient);
        }
      }
      router.push("/inbox");
    };

    routeToInbox();
  }, [window.location.pathname, recipientWalletAddr]);

  return <div></div>;
};

export default DmPage;
