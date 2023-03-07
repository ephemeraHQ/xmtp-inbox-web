import { Client } from "@xmtp/xmtp-js";
import { useEffect, useState } from "react";
import { useSigner } from "wagmi";
import { getAppVersion, getEnv, loadKeys, storeKeys } from "../helpers";
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
      if (signer) {
        setIsLoading(true);
        const address = await signer.getAddress();
        const keys = await Client.getKeys(signer, {
          env: getEnv(),
          appVersion: getAppVersion(),
        });
        storeKeys(address, keys);
        setNewAccount(false);
        setIsLoading(false);
      }
    } catch (e) {
      console.error(e);
      setNewAccount(false);
      setIsLoading(false);
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
          await createXmtpIdentity();
          keys = loadKeys(address);
        }
        if (keys) {
          const xmtp = await Client.create(null, {
            env: getEnv(),
            appVersion: getAppVersion(),
            privateKeyOverride: keys,
          });
          setClient(xmtp);
          setIsRequestPending(false);
          setNewAccount(false);
          setIsLoading(false);
        }
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
        const canMessage = await Client.canMessage(address);
        if (canMessage) {
          setNewAccount(false);
          connectToXmtp();
        } else {
          setNewAccount(true);
        }
      } catch (e) {
        console.error(e);
        setNewAccount(true);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!isRequestPending) {
      signer && initClient();
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
