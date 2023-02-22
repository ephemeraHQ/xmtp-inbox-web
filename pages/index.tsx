import type { NextPage } from "next";
import { useEffect } from "react";
import { useXmtpStore } from "../store/xmtp";
import { watchAccount } from "@wagmi/core";
import useInitXmtpClient from "../hooks/useInitXmtpClient";
import useHandleConnect from "../hooks/useHandleConnect";
import { useAccount } from "wagmi";
import { useRouter } from "next/router";
import ConnectingDom from "../components/Login/ConnectingDom";
import CreateXmtpIdentityDom from "../components/Login/CreateXmtpIdentityDom";
import ConnectWalletDom from "../components/Login/ConnectWalletDom";
import EnableXmtpIdentityDom from "../components/Login/EnableXmtpIdentityDom";

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
        {isDisconnected && <ConnectWalletDom handleConnect={handleConnect} />}
        {isConnecting && !isDisconnected ? (
          <ConnectingDom />
        ) : (
          <>
            {newAccount && client === null ? (
              <CreateXmtpIdentityDom
                isLoading={isLoading}
                createXmtpIdentity={createXmtpIdentity}
              />
            ) : (
              <EnableXmtpIdentityDom
                enableXmtpIdentity={connectToXmtp}
                isLoading={isLoading}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
