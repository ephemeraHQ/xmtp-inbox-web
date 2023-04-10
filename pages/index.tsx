import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useXmtpStore } from "../store/xmtp";
import { watchAccount, fetchEnsName } from "@wagmi/core";
import ReactGA from "react-ga4";
import useInitXmtpClient from "../hooks/useInitXmtpClient";
import useHandleConnect from "../hooks/useHandleConnect";
import { useAccount, useDisconnect } from "wagmi";
import { useRouter } from "next/router";
import { TRACK_WALLETS, classNames, isAppEnvDemo, wipeKeys } from "../helpers";
import { OnboardingStep } from "../component-library/components/OnboardingStep/OnboardingStep";

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
        if (TRACK_WALLETS.includes(address)) {
          ReactGA.initialize("G-ME1W9N9QJ5");
          const ensName = await fetchEnsName({
            address,
          });
          ReactGA.send({
            hitType: "pageview",
            page: "/inbox",
            title: ensName ?? address,
          });
        }
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
