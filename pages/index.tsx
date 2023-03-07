import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useXmtpStore } from "../store/xmtp";
import { watchAccount } from "@wagmi/core";
import useInitXmtpClient from "../hooks/useInitXmtpClient";
import useHandleConnect from "../hooks/useHandleConnect";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import { PillButton } from "../component-library/components/PillButton/PillButton";
import { classNames } from "../helpers";
import DisconnectButton from "../component-library/components/DisconnectButton/DisconnectButton";
import { Spinner } from "../component-library/components/Loaders/Spinner";

const LoginPageHeaderText = ({
  text,
  isLoading,
  stepNumber,
}: {
  text: string;
  isLoading: boolean;
  stepNumber: number;
}) => (
  <>
    {(stepNumber === 2 || stepNumber === 3) && (
      <div
        className={classNames(
          "text-base",
          isLoading ? "mt-[12px]" : "mt-[-172px]",
        )}>
        Step {stepNumber - 1} of 2
      </div>
    )}
    <div
      className={classNames(
        "font-bold",
        "text-3xl",
        "text-center",
        stepNumber === 1 ? (isLoading ? "mt-[12px]" : "mt-[-172px]") : null,
      )}>
      {text}
    </div>
  </>
);

const Home: NextPage = () => {
  const client = useXmtpStore((state) => state.client);
  const [step, setStep] = useState(1);
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { handleConnect } = useHandleConnect();
  const { createXmtpIdentity, newAccount, connectToXmtp, isLoading } =
    useInitXmtpClient();
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

  const stepMapping = {
    [1 as number]: {
      default: {
        header: "Your interoperable web3 inbox",
        subheader:
          "You're just a few steps away from secure, wallet-to-wallet messaging",
        subtext: "No private keys will be shared",
        ctaText: "Connect Your Wallet",
        cta: handleConnect,
      },
      loading: {
        header: "Connecting to your wallet...",
        subheader:
          "Look for a signature dialog in the wallet you previously selected",
        subtext: "No private keys will be shared",
      },
    },
    [2 as number]: {
      default: {
        header: "Create your XMTP identity",
        subheader:
          "Now that your wallet is connected, we're going to create your XMTP identity on our network with a wallet signature.",
        ctaText: "Create XMTP Identity",
        cta: createXmtpIdentity,
      },
      loading: {
        header: "Creating your XMTP identity...",
        subheader:
          "Look for a confirmation dialog in the wallet you've selected.",
      },
    },
    [3 as number]: {
      default: {
        header: "Enable messaging on XMTP",
        subheader:
          "You're activated on the XMTP network! Now let's enable your ability to start messaging and you can start messaging wallets right away.",
        ctaText: "Enable XMTP Identity",
        cta: connectToXmtp,
      },
      loading: {
        header: "Almost there! One more signature.",
        subheader:
          "Look for a confirmation dialog in the wallet you've selected.",
      },
    },
  };

  return (
    <div className="h-[100vh] bg-[url('/login-bg.png')] bg-no-repeat bg-cover">
      {!address && !client && (
        <div
          className="flex justify-end text-sm font-bold text-p-500 underline cursor-pointer absolute right-4 top-4"
          onClick={() => {
            window.open("https://demo.xmtp.chat", "_blank");
          }}>
          Try a demo
        </div>
      )}
      <div
        className={classNames(
          "flex flex-col items-center mx-6 text-center h-full",
          loading ? "justify-center" : null,
        )}>
        <div>
          {loading ? (
            <Spinner />
          ) : (
            <img
              className="sm:h-[80vh] md:h-[90vh] w-auto"
              src="/login-graphic.png"
              alt="XMTP Onboarding Img"
            />
          )}
        </div>
        <div className="md:max-w-[45%] sm:max-w-[75%]">
          <LoginPageHeaderText
            stepNumber={step}
            text={
              loading
                ? stepMapping[step].loading.header
                : stepMapping[step].default.header
            }
            isLoading={loading}
          />
          <div className="text-lg mt-2 text-center">
            {loading
              ? stepMapping[step].loading.subheader
              : stepMapping[step].default.subheader}
          </div>
          <div className="mt-2">
            <PillButton
              onClick={stepMapping[step].default.cta}
              label={stepMapping[step].default.ctaText}
            />
          </div>
          {(step === 2 || step === 3) && <DisconnectButton />}
          {stepMapping[step].default.subtext && (
            <div className="text-base mt-2 font-bold text-gray-700">
              No private keys will be shared
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
