import { Client } from "@xmtp/xmtp-js";
import { useEffect, useState } from "react";
import { useAccount, useSigner } from "wagmi";
import { address } from "../components/Address";
import { getAppVersion, getEnv, loadKeys, storeKeys } from "../helpers";
import { useXmtpStore } from "../store/xmtp";

const useInitXmtpClient = () => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const client = useXmtpStore((state) => state.client);
  const setClient = useXmtpStore((state) => state.setClient);
  const [isRequestPending, setIsRequestPending] = useState(false);

  const initClient = async () => {
    if (signer && !client) {
      try {
        const address = await signer.getAddress();
        setIsRequestPending(true);
        let keys = loadKeys(address);
        if (!keys) {
          keys = await Client.getKeys(signer, {
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
          env: getEnv(),
          appVersion: getAppVersion(),
          persistConversations: true,
          privateKeyOverride: keys,
        });
        setClient(xmtp);
        setIsRequestPending(false);
      } catch (e) {
        console.error(e);
        setClient(null);
        setIsRequestPending(false);
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
  };
};

export default useInitXmtpClient;
