import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useXmtpStore } from "../store/xmtp";
import { watchAccount } from "@wagmi/core";
import useInitXmtpClient from "../hooks/useInitXmtpClient";
import useHandleConnect from "../hooks/useHandleConnect";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { classNames, isAppEnvDemo, wipeKeys } from "../helpers";
import { OnboardingStep } from "../component-library/components/OnboardingStep/OnboardingStep";
import { emitPageVisitEvent } from "../helpers/internalTracking";
import { address } from "./inbox";

const OnboardingPage: NextPage = () => {
  const client = useXmtpStore((state) => state.client);
  const [step, setStep] = useState(1);
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { handleConnect } = useHandleConnect();
  const { createXmtpIdentity, newAccount, connectToXmtp, isLoading } =
    useInitXmtpClient();
  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();

  const router = useRouter();

  useEffect(() => {
    watchAccount(() => resetXmtpState());
  }, []);

  useEffect(() => {
    const routeToInBox = async () => {
      if (address && !newAccount && client) {
        /* The function below, emitPageVisitEvent will only be called for specific 
          wallets of XMTP-LABS team members using the interal domain alpha.xmtp.chat 
          to gather insights about user behaviour which can help the team 
          to build a better app. */
        await emitPageVisitEvent(address as address);
        router.push("/inbox");
      }
    };
    routeToInBox();
  }, [client, address, newAccount]);

  useEffect(() => {
    if (isAppEnvDemo()) {
      setStep(0);
    } else {
      if (isDisconnected) {
        setStep(1);
      } else if (isConnecting && !isDisconnected) {
        setStep(1);
      } else if (newAccount && !client) {
        setStep(2);
      } else {
        setStep(3);
      }
    }
  }, [client, isConnecting, isDisconnected, newAccount]);

  return (
    <div className={classNames("h-screen", "w-full", "overflow-auto")}>
      <OnboardingStep
        step={step}
        isLoading={isLoading}
        onConnect={handleConnect}
        onCreate={createXmtpIdentity}
        onEnable={connectToXmtp}
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
