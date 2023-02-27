import type { NextPage } from "next";
import { useEffect } from "react";
import { useXmtpStore } from "../store/xmtp";
import { watchAccount } from "@wagmi/core";
import useInitXmtpClient from "../hooks/useInitXmtpClient";
import useHandleConnect from "../hooks/useHandleConnect";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import ConnectingDom from "../components/Login/ConnectingDom";
import ConnectWalletDom from "../components/Login/ConnectWalletDom";
import XmtpOnboardingDom from "../components/Login/XmtpOnboardingDom";

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
    <div className="h-[100vh] p-6 bg-[url('/login-bg.png')] bg-no-repeat bg-cover">
      {!address && client === null && (
        <div
          className="flex justify-end text-sm font-bold text-p-500 underline cursor-pointer"
          onClick={() => {
            window.open("https://demo.xmtp.chat", "_blank");
          }}>
          Try a demo
        </div>
      )}
      <div className="flex flex-col items-center justify-center mx-6 text-center h-full">
        {isDisconnected ? (
          <ConnectWalletDom handleConnect={handleConnect} />
        ) : (
          <>
            {isConnecting && !isDisconnected ? (
              <ConnectingDom />
            ) : (
              <>
                {newAccount && !client ? (
                  <XmtpOnboardingDom
                    isLoading={isLoading}
                    cta={createXmtpIdentity}
                    ctaText="Create XMTP identity"
                    infoText="Now that your wallet is connected, we're going to create your XMTP identity on our network with a wallet signature."
                    stepNumber="1"
                    imgSrc="/login-page-step-img.png"
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
                    imgSrc="/login-page-step-img.png"
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
