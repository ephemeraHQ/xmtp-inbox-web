import { Client, useClient, useCanMessage } from "@xmtp/react-sdk";
import { useEffect, useMemo, useRef, useState } from "react";
import { useConnect, useSigner } from "wagmi";
import type { Signer } from "ethers";
import {
  AttachmentCodec,
  RemoteAttachmentCodec,
} from "@xmtp/content-type-remote-attachment";
import {
  getAppVersion,
  getEnv,
  isAppEnvDemo,
  loadKeys,
  storeKeys,
} from "../helpers";
import { mockConnector } from "../helpers/mockConnector";

type ClientStatus = "new" | "created" | "enabled";

type ResolveReject<T = void> = (value: T | PromiseLike<T>) => void;

/**
 * This is a helper function for creating a new promise and getting access
 * to the resolve and reject callbacks for external use.
 */
const makePromise = <T = void>() => {
  let reject: ResolveReject<T> = () => {};
  let resolve: ResolveReject<T> = () => {};
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
  apiUrl: import.meta.env.VITE_XMTP_API_URL,
  env: getEnv(),
  appVersion: getAppVersion(),
  codecs: [new AttachmentCodec(), new RemoteAttachmentCodec()],
};

const useInitXmtpClient = () => {
  // track if onboarding is in progress
  const onboardingRef = useRef(false);
  const signerRef = useRef<Signer | null>();
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

  // create promise, callback, and resolver for controlling the display of the
  // create account signature.
  const { createResolve, preCreateIdentityCallback, resolveCreate } =
    useMemo(() => {
      const { promise: createPromise, resolve } = makePromise();
      return {
        createResolve: resolve,
        preCreateIdentityCallback: () => createPromise,
        // executing this function will result in displaying the create account
        // signature prompt
        resolveCreate: () => {
          createResolve();
          setSigning(true);
        },
      };
      // if the signer changes during the onboarding process, reset the promise
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer]);

  // create promise, callback, and resolver for controlling the display of the
  // enable account signature.
  const { enableResolve, preEnableIdentityCallback, resolveEnable } =
    useMemo(() => {
      const { promise: enablePromise, resolve } = makePromise();
      return {
        enableResolve: resolve,
        // this is called right after signing the create identity signature
        preEnableIdentityCallback: () => {
          setSigning(false);
          setStatus("created");
          return enablePromise;
        },
        // executing this function will result in displaying the enable account
        // signature prompt
        resolveEnable: () => {
          enableResolve();
          setSigning(true);
        },
      };
      // if the signer changes during the onboarding process, reset the promise
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [signer]);

  const { client, isLoading, initialize } = useClient();
  const { canMessageStatic: canMessageUser } = useCanMessage();

  // if this is an app demo, connect to the temporary wallet
  useEffect(() => {
    if (isAppEnvDemo()) {
      connectWallet({ connector: mockConnector });
    }
    if (!client) {
      setStatus(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // the code in this effect should only run once
  useEffect(() => {
    const updateStatus = async () => {
      // onboarding is in progress
      if (onboardingRef.current) {
        // the signer has changed, restart the onboarding process
        if (signer !== signerRef.current) {
          setStatus(undefined);
          setSigning(false);
        } else {
          // onboarding in progress and signer is the same, do nothing
          return;
        }
      }
      // skip this if we already have a client and ensure we have a signer
      if (!client && signer) {
        onboardingRef.current = true;
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
          // demo mode, wallet won't require any signatures
          if (isAppEnvDemo()) {
            // resolve client promises
            createResolve();
            enableResolve();
          } else {
            // no keys found, but maybe the address has already been created
            // let's check
            const canMessage = await canMessageUser(address, clientOptions);
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
        onboardingRef.current = false;
      }
    };
    void updateStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client, signer]);

  // it's important that this effect runs last
  useEffect(() => {
    signerRef.current = signer;
  }, [signer]);

  return {
    client,
    isLoading: isLoading || signing,
    resolveCreate,
    resolveEnable,
    status,
    setStatus,
  };
};

export default useInitXmtpClient;
