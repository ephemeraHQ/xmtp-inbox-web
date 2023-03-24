import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useXmtpStore } from "../store/xmtp";
import { watchAccount } from "@wagmi/core";
import useInitXmtpClient from "../hooks/useInitXmtpClient";
import useHandleConnect from "../hooks/useHandleConnect";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { classNames, wipeKeys } from "../helpers";
import { OnboardingStep } from "../component-library/components/OnboardingStep/OnboardingStep";
import { useTranslation } from "react-i18next";

const OnboardingPage: NextPage = () => {
  const client = useXmtpStore((state) => state.client);
  const [step, setStep] = useState(1);
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { handleConnect } = useHandleConnect();
  const { createXmtpIdentity, newAccount, connectToXmtp, isLoading } =
    useInitXmtpClient();
  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(isLoading);
  const router = useRouter();

  useEffect(() => {
    watchAccount(() => resetXmtpState());
  }, []);

  useEffect(() => {
    if (address && !newAccount && client) {
      router.push("/inbox");
    }
  }, [client, address, newAccount]);

  useEffect(() => {
    if (isDisconnected) {
      setStep(1);
      setLoading(false);
    } else if (isConnecting && !isDisconnected) {
      setStep(1);
      setLoading(true);
    } else if (newAccount && !client) {
      setStep(2);
    } else {
      setStep(3);
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
