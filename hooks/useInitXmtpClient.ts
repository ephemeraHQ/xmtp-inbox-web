import { Client } from '@xmtp/xmtp-js';
import { Signer } from 'ethers';
import { useCallback, useEffect, useState } from 'react';
import { useAccount, useSigner } from 'wagmi';
import { getAppVersion, getEnv, loadKeys, storeKeys, wipeKeys } from '../helpers';
import { useXmtpStore } from '../store/xmtp';

const useInitXmtpClient = (cacheOnly = false) => {
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();
  const client = useXmtpStore((state) => state.client);
  const setClient = useXmtpStore((state) => state.setClient);
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const [isRequestPending, setIsRequestPending] = useState(false);

  const disconnect = () => {
    resetXmtpState();
    wipeKeys(address ?? '');
  };

  const initClient = useCallback(
    async (wallet: Signer) => {
      if (wallet && !client && address) {
        try {
          setIsRequestPending(true);
          let keys = loadKeys(address);
          if (!keys) {
            if (cacheOnly) {
              return;
            }
            keys = await Client.getKeys(wallet, {
              env: getEnv(),
              appVersion: getAppVersion()
            });
            storeKeys(address, keys);
          }
          const xmtp = await Client.create(null, {
            env: getEnv(),
            appVersion: getAppVersion(),
            privateKeyOverride: keys
          });
          setClient(xmtp);
          setIsRequestPending(false);
        } catch (e) {
          console.error(e);
          setClient(null);
          setIsRequestPending(false);
        }
      }
    },
    [client, signer, address]
  );

  useEffect(() => {
    if (!isRequestPending) {
      signer ? initClient(signer) : disconnect();
    }
  }, [signer, initClient, address, isConnected]);

  return {
    initClient
  };
};

export default useInitXmtpClient;
