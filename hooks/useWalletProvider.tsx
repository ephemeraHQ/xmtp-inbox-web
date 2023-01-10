import { useCallback, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import { useAppStore } from '../store/app';
import { isAppEnvDemo, SILENTLY_FAILING_ERRORS } from '../helpers';
import useDisconnect from './useDisconnect';
import providerOptions from '../helpers/providerOptions';

const useWalletProvider = () => {
  const web3Modal = useAppStore((state) => state.web3Modal);
  const setWeb3Modal = useAppStore((state) => state.setWeb3Modal);
  const setAddress = useAppStore((state) => state.setAddress);
  const setSigner = useAppStore((state) => state.setSigner);
  const setProvider = useAppStore((state) => state.setProvider);
  const { disconnect } = useDisconnect();
  const [isError, setError] = useState(false);

  const handleAccountsChanged = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const connect = useCallback(async () => {
    const isDemoEnv = isAppEnvDemo();
    if (!isDemoEnv) {
      if (!web3Modal) {
        throw new Error('web3Modal not initialized');
      }
      try {
        const instance = await web3Modal.connect();
        if (!instance) {
          return;
        }
        instance.on('accountsChanged', handleAccountsChanged);
        const newProvider = new ethers.providers.Web3Provider(instance, 'any');
        const newSigner = newProvider.getSigner();
        setProvider(newProvider);
        setSigner(newSigner);
        setAddress(await newSigner.getAddress());
        return newSigner;
      } catch (error) {
        if (error instanceof Error) {
          if (!SILENTLY_FAILING_ERRORS.includes(error.message)) {
            setError(true);
          }
        }
      }
    }
  }, [handleAccountsChanged, web3Modal]);

  useEffect(() => {
    !web3Modal && setWeb3Modal(new Web3Modal({ cacheProvider: false, providerOptions }));
  }, []);

  useEffect(() => {
    if (!web3Modal) {
      return;
    }
    const initCached = async () => {
      try {
        const cachedProviderJson = localStorage.getItem('WEB3_CONNECT_CACHED_PROVIDER');
        if (!cachedProviderJson) {
          return;
        }
        const cachedProviderName = JSON.parse(cachedProviderJson);
        const instance = await web3Modal.connectTo(cachedProviderName);
        if (!instance) {
          return;
        }
        instance.on('accountsChanged', handleAccountsChanged);
        const newProvider = new ethers.providers.Web3Provider(instance, 'any');
        const newSigner = newProvider.getSigner();
        setProvider(newProvider);
        setSigner(newSigner);
        setAddress(await newSigner.getAddress());
      } catch (e) {
        console.error(e);
      }
    };
    initCached();
  }, [web3Modal]);

  return {
    connect,
    isError
  };
};

export default useWalletProvider;
