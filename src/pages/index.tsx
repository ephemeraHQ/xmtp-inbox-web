// import type { NextPage } from "next";
import { useEffect, useMemo } from "react";
import { useXmtpStore } from "../store/xmtp";
import { watchAccount } from "@wagmi/core";
import useInitXmtpClient from "../hooks/useInitXmtpClient";
import { useAccount, useDisconnect } from "wagmi";
// import { useRouter } from "next/router";
import { classNames, isAppEnvDemo, wipeKeys } from "../helpers";
import { OnboardingStep } from "../component-library/components/OnboardingStep/OnboardingStep";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useClient } from "@xmtp/react-sdk";

const OnboardingPage = () => {
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { client, isLoading, status, setStatus, resolveCreate, resolveEnable } =
    useInitXmtpClient();
  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();
  const { disconnect: disconnectClient } = useClient();
  // const router = useRouter();

  useEffect(() => {
    return watchAccount(() => resetXmtpState());
  }, []);

  useEffect(() => {
    const routeToInbox = async () => {
      if (client) {
        // router.push("/inbox");
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
        onDisconnect={async () => {
          if (client) {
            await disconnectClient();
          }
          setStatus(undefined);
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
