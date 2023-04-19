import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import { useXmtpStore } from "../store/xmtp";
import { watchAccount } from "@wagmi/core";
import useInitXmtpClient from "../hooks/useInitXmtpClient";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { classNames, isAppEnvDemo, wipeKeys } from "../helpers";
import { OnboardingStep } from "../component-library/components/OnboardingStep/OnboardingStep";
import { emitPageVisitEvent } from "../helpers/internalTracking";
import { address } from "./inbox";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const OnboardingPage: NextPage = () => {
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { client, isLoading, status, resolveCreate, resolveEnable } =
    useInitXmtpClient();
  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();

  const router = useRouter();

  useEffect(() => {
    return watchAccount(() => resetXmtpState());
  }, []);

  useEffect(() => {
    const routeToInbox = async () => {
      if (client) {
        /* The emitPageVisitEvent function is called only when
          specific XMTP Labs team wallets use
          the internal domain alpha.xmtp.chat. This
          tracking is temporary and meant to help
          surface insights about team usage to
          help build a better app. */
        await emitPageVisitEvent(address as address);
        router.push("/inbox");
      }
    };
    routeToInbox();
  }, [client]);

  const step = useMemo(() => {
    // special demo case that will skip onboarding
    if (isAppEnvDemo()) {
      return 0;
    }
    switch (status) {
      // XMTP identity not created
      case "new":
        return 2;
      // XMTP identity created, but not enabled
      case "created":
        return 3;
      // waiting on wallet connection
      case undefined:
      default:
        return 1;
    }
  }, [status]);

  return (
    <div className={classNames("h-screen", "w-full", "overflow-auto")}>
      <OnboardingStep
        step={step}
        isLoading={isLoading}
        onConnect={openConnectModal}
        onCreate={resolveCreate}
        onEnable={resolveEnable}
        onDisconnect={() => {
          wipeKeys(address ?? "");
          disconnectWagmi();
          resetWagmi();
          resetXmtpState();
        }}
      />
    </div>
  );
};

export default OnboardingPage;
