import { Client } from "@xmtp/xmtp-js";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useConnect, useSigner } from "wagmi";
import { MockConnector } from "@wagmi/core/connectors/mock";
import { Wallet } from "ethers/lib";
import {
  getAppVersion,
  getEnv,
  isAppEnvDemo,
  loadKeys,
  storeKeys,
} from "../helpers";
import { useClient } from "@xmtp/react-sdk";

type ClientStatus = "new" | "created" | "enabled" | "no-signer";

/**
 * This is a helper function for creating a new promise and getting access
 * to the resolve and reject callbacks for external use.
 */
const makePromise = <T = void>() => {
  let reject: (value: T | PromiseLike<T>) => void = () => {};
  let resolve: (value: T | PromiseLike<T>) => void = () => {};
  const promise = new Promise<T>((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return {
    promise,
    reject,
    resolve,
  };
};

// XMTP client options
const clientOptions = {
  apiUrl: process.env.NEXT_PUBLIC_XMTP_API_URL,
  env: getEnv(),
  appVersion: getAppVersion(),
};

const useInitXmtpClient = () => {
  // track if an update is in flight
  const updatingRef = useRef(false);
  // XMTP address status
  const [status, setStatus] = useState<ClientStatus | undefined>();
  // is there a pending signature?
  const [signing, setSigning] = useState(false);
  const { data: signer } = useSigner();
  const { connect: connectWallet } = useConnect();

  /**
   * In order to have more granular control of the onboarding process, we must
   * create promises that we can resolve externally. These promises will allow
   * us to control when the user is prompted for signatures during the account
   * creation process.
   */

  // create promise for controlling the display of the create account signature
  // this value should not change over time
  const { promise: createPromise, resolve: createResolve } = useMemo(
    () => makePromise(),
    [],
  );

  // associated callback passed as XMTP client option
  // this value should not change over time
  const preCreateIdentityCallback = useCallback(() => createPromise, []);

  // executing this function will result in displaying the create account
  // signature prompt
  const resolveCreate = useCallback(async () => {
    createResolve();
    setSigning(true);
  }, [signer]);

  // create promise for controlling the display of the enable account signature
  // this value should not change over time
  const { promise: enablePromise, resolve: enableResolve } = useMemo(
    () => makePromise(),
    [],
  );

  // associated callback passed as XMTP client option
  // this value should not change over time
  const preEnableIdentityCallback = useCallback(() => {
    setSigning(false);
    setStatus("created");
    return enablePromise;
  }, []);

  // executing this function will result in displaying the enable account
  // signature prompt
  const resolveEnable = useCallback(() => {
    enableResolve();
    setSigning(true);
  }, []);

  const { client, isLoading, initialize } = useClient();

  // the code in this effect should only run once
  useEffect(() => {
    const updateStatus = async () => {
      // prevent this code from running when it's already in flight
      if (updatingRef.current) {
        return;
      }
      // skip this if we already have a client
      // skip this if the client is busy
      // effectively, once these conditions are met,
      // this code will only run once
      if (!client && !isLoading && signer) {
        updatingRef.current = true;
        const address = await signer.getAddress();
        let keys = loadKeys(address);
        // check if we already have the keys
        if (keys) {
          // resolve client promises
          createResolve();
          enableResolve();
          // no signatures needed
          setStatus("enabled");
        } else {
          // if this is an app demo, we need to create a temporary wallet
          if (isAppEnvDemo()) {
            const mockConnector = new MockConnector({
              options: { signer: Wallet.createRandom() },
            });
            connectWallet({ connector: mockConnector });
            // resolve client promises as this wallet won't require any
            // signatures
            createResolve();
            enableResolve();
          } else {
            // no keys found, but maybe the address has already been created
            // let's check
            const canMessage = await Client.canMessage(address, clientOptions);
            if (canMessage) {
              // resolve client promise
              createResolve();
              // identity has been created
              setStatus("created");
            } else {
              // no identity on the network
              setStatus("new");
            }
          }
          // get client keys
          keys = await Client.getKeys(signer, {
            ...clientOptions,
            // we don't need to publish the contact here since it
            // will happen when we create the client later
            skipContactPublishing: true,
            // we can skip persistence on the keystore for this short-lived
            // instance
            persistConversations: false,
            preCreateIdentityCallback,
            preEnableIdentityCallback,
          });
          // all signatures have been accepted
          setStatus("enabled");
          setSigning(false);
          // persist client keys
          storeKeys(address, keys);
        }
        // initialize client
        await initialize({ keys, options: clientOptions, signer });
        updatingRef.current = false;
      }
    };
    updateStatus();
  }, [
    client,
    connectWallet,
    createResolve,
    enableResolve,
    initialize,
    isLoading,
    preCreateIdentityCallback,
    preEnableIdentityCallback,
    signer,
  ]);

  return {
    client,
    isLoading: isLoading || signing,
    resolveCreate,
    resolveEnable,
    status,
  };
};

export default useInitXmtpClient;
