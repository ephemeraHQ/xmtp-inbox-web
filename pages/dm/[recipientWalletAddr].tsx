import React from "react";
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

  const routeToInbox = async () => {
    let recipient = router.query.recipientWalletAddr
      ? (router.query.recipientWalletAddr as string)
      : window.location.pathname.split("/").slice(-1)[0];
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
    router.push("/inbox");
  };

  if (
    window.location.pathname.includes("/dm") ||
    router.query.recipientWalletAddr
  ) {
    routeToInbox();
  }

  return <div></div>;
};

export default DmPage;
