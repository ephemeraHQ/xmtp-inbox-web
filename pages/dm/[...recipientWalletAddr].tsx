import React, { useEffect } from "react";
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

  useEffect(() => {
    const routeToInbox = async () => {
      let recipient = window.location.pathname.split("/").slice(-1)[0];
      if (isValidRecipientAddressFormat(recipient)) {
        if (isEnsAddress(recipient)) {
          recipient =
            (await fetchEnsAddress({
              name: recipient,
            })) ?? "";
        }
        setConversationId(recipient);
        setRecipientWalletAddress(recipient);
        router.push("/inbox");
      }
    };
    if (window.location.pathname.includes("/dm")) {
      routeToInbox();
    }
  }, [window.location.pathname]);

  return <div></div>;
};

export default DmPage;
