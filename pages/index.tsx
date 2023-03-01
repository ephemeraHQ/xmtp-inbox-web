import type { NextPage } from "next";
import { useEffect } from "react";
import { useXmtpStore } from "../store/xmtp";
import { watchAccount } from "@wagmi/core";
import useInitXmtpClient from "../hooks/useInitXmtpClient";
import useHandleConnect from "../hooks/useHandleConnect";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import {
  LoginPageHeaderText,
  LoginPageInfoText,
  LoginSubText,
} from "../components/Login/LoginDomTextElements";
import XmtpOnboardingDom from "../components/Login/XmtpOnboardingDom";
import Loader from "../components/Loader";
import { Button } from "../component-library/Button";
import { ArrowCircleRightIcon } from "@heroicons/react/outline";

const Home: NextPage = () => {
  const client = useXmtpStore((state) => state.client);
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { address, isConnecting, isDisconnected } = useAccount();
  const { handleConnect } = useHandleConnect();
  const { createXmtpIdentity, newAccount, connectToXmtp, isLoading } =
    useInitXmtpClient();
  const router = useRouter();

  useEffect(() => {
    watchAccount(() => resetXmtpState());
  }, []);

  useEffect(() => {
    if (address && !newAccount && client) {
      router.push("/inbox");
    }
  }, [client, address, newAccount]);

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
      <div className="flex flex-col items-center mx-6 text-center h-full">
        <div>
          {isLoading ? (
            <Loader isLoading={isLoading} />
          ) : (
            <img
              className="sm:h-[80vh] md:h-[90vh] w-auto"
              src="/login-page-step-img.png"
              alt="XMTP Onboarding Img"
            />
          )}
        </div>
        {isDisconnected ? (
          <>
            <LoginPageHeaderText
              text="Your interoperable web3 inbox"
              isLoading={isLoading}
            />
            <LoginPageInfoText text="You're just a few steps away from secure, wallet-to-wallet messaging" />
            <div className="mt-2">
              <Button
                onClick={handleConnect}
                label="Connect your wallet"
                icon={<ArrowCircleRightIcon width={20} />}
              />
            </div>
            <LoginSubText />
          </>
        ) : (
          <>
            {isConnecting && !isDisconnected ? (
              <div>
                <LoginPageHeaderText
                  text="Connecting to your wallet..."
                  isLoading={isLoading}
                />
                <LoginPageInfoText text="Look for a signature dialog in the wallet you previously selected." />
                <LoginSubText />
              </div>
            ) : (
              <>
                {newAccount && !client ? (
                  <XmtpOnboardingDom
                    isLoading={isLoading}
                    cta={createXmtpIdentity}
                    ctaText="Create XMTP identity"
                    infoText="Now that your wallet is connected, we're going to create your XMTP identity on our network with a wallet signature."
                    stepNumber="1"
                    header="Create your XMTP identity"
                    loadingHeader="Creating your XMTP identity..."
                  />
                ) : (
                  <XmtpOnboardingDom
                    isLoading={isLoading}
                    cta={connectToXmtp}
                    ctaText="Enable XMTP Identity"
                    infoText="You’re activated on the XMTP network! Now let’s enable your ability to start messaging and you can start messaging wallets right away."
                    stepNumber="2"
                    header="Enable messaging on XMTP"
                    loadingHeader="Almost there! One more signature."
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
