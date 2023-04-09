import { Client } from "@xmtp/xmtp-js";
import { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import {
  getAppVersion,
  getEnv,
  isAppEnvDemo,
  loadKeys,
  storeKeys,
} from "../helpers";
import { useXmtpStore } from "../store/xmtp";

const useInitXmtpClient = () => {
  const { data: signer } = useSigner();
  const client = useXmtpStore((state) => state.client);
  const setClient = useXmtpStore((state) => state.setClient);
  const [isRequestPending, setIsRequestPending] = useState(false);
  const [newAccount, setNewAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const createXmtpIdentity = async () => {
    try {
      if (signer && !client) {
        setIsRequestPending(true);
        setIsLoading(true);
        const address = await signer.getAddress();
        let keys = loadKeys(address);
        if (!keys) {
          keys = await Client.getKeys(signer, {
            apiUrl: process.env.NEXT_PUBLIC_XMTP_API_URL,
            env: getEnv(),
            appVersion: getAppVersion(),
          });
          storeKeys(address, keys);
          if (keys && isAppEnvDemo()) {
            await connectToXmtp();
          }
        }
        setIsRequestPending(false);
        setNewAccount(false);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setNewAccount(false);
      setIsLoading(false);
      setIsRequestPending(false);
    }
  };

  const connectToXmtp = async () => {
    if (signer) {
      try {
        setIsLoading(true);
        const address = await signer.getAddress();
        setIsRequestPending(true);
        let keys = loadKeys(address);
        if (!keys) {
          keys = await Client.getKeys(signer, {
            apiUrl: process.env.NEXT_PUBLIC_XMTP_API_URL,
            env: getEnv(),
            appVersion: getAppVersion(),
            // We don't need to publish the contact here since it
            // will happen on the `Client.create(...)` below
            skipContactPublishing: true,
            // We can skip persistence on the keystore for this short-lived
            // instance
            persistConversations: false,
          });
          storeKeys(address, keys);
        }
        const xmtp = await Client.create(null, {
          apiUrl: process.env.NEXT_PUBLIC_XMTP_API_URL,
          env: getEnv(),
          appVersion: getAppVersion(),
          persistConversations: true,
          privateKeyOverride: keys,
        });
        setClient(xmtp);
        setIsRequestPending(false);
        setIsLoading(false);
      } catch (e) {
        console.error(e);
        setClient(null);
        setIsRequestPending(false);
        setIsLoading(false);
      }
    }
  };

  const initClient = async () => {
    if (signer && !client) {
      const address = await signer.getAddress();
      try {
        setIsLoading(true);
        setIsRequestPending(true);
        const canMessage = await Client.canMessage(address, {
          apiUrl: process.env.NEXT_PUBLIC_XMTP_API_URL,
          env: getEnv(),
        });
        if (canMessage) {
          setNewAccount(false);
          connectToXmtp();
        } else {
          setNewAccount(true);
        }
        setIsRequestPending(false);
      } catch (e) {
        console.error(e);
        setNewAccount(true);
      } finally {
        setIsLoading(false);
        setIsRequestPending(false);
      }
    }
  };

  useEffect(() => {
    if (!isRequestPending) {
      signer && !client && initClient();
      if (isAppEnvDemo()) {
        createXmtpIdentity();
      }
    }
  }, [signer]);

  return {
    initClient,
    createXmtpIdentity,
    newAccount,
    connectToXmtp,
    isLoading,
  };
};

export default useInitXmtpClient;
