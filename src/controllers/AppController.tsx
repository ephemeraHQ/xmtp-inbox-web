// Temporarily removing until we pull components from the SDK.
// import "@xmtp/react-sdk/style.css";
import "../../.storybook/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { fetchEnsAddress } from "@wagmi/core";
import React, { useEffect } from "react";
import { isEnsAddress, isValidRecipientAddressFormat } from "../helpers";
import "../helpers/i18n";
import { useXmtpStore } from "../store/xmtp";
import { datadogRum } from "@datadog/browser-rum";
import { ENVIRONMENT } from "../helpers";

const AppController: React.FC = () => {
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const setConversationId = useXmtpStore((state) => state.setConversationId);

  useEffect(() => {
    const routeToInbox = async () => {
      let recipient = window.location.href.split("/").slice(-1)[0];
      if (isValidRecipientAddressFormat(recipient)) {
        if (isEnsAddress(recipient)) {
          recipient =
            (await fetchEnsAddress({
              name: recipient,
            })) ?? "";
        }
        if (recipient) {
          setConversationId(recipient);
          setRecipientWalletAddress(recipient);
          // router.push("/inbox");
        } else {
          // router.push("/");
        }
      } else {
        // router.push("/");
      }
    };
    if (window?.location?.href.includes("/dm")) {
      routeToInbox();
    }
  }, []);

  useEffect(() => {
    /* The initialization below will only happen 
    on our internal testing url (alpha.xmtp.chat)
    and is used for performance testing purposes.
    This tracking is meant to help surface insights 
    about performance based on team usage, and flag
    any performance degradations before they hit our
    production users. */
    if (window.location.hostname.includes(ENVIRONMENT.ALPHA)) {
      datadogRum.init({
        applicationId: import.meta.env.DATA_DOG_ID as string,
        clientToken: import.meta.env.DATA_DOG_TOKEN as string,
        site: "datadoghq.com",
        service: "inbox-web",
        env: "prod",
        sessionSampleRate: 100,
        sessionReplaySampleRate: 0,
        trackUserInteractions: false,
        trackResources: true,
        trackLongTasks: true,
        defaultPrivacyLevel: "mask",
      });

      datadogRum.startSessionReplayRecording();
    }
  }, []);

  return <>hello, world!</>;
};

export default AppController;
