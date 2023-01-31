import { useCallback, useEffect, useState } from 'react';
import { ethers, Wallet } from 'ethers';
import { ProviderType, useAppStore } from '../store/app';
import { isAppEnvDemo } from '../helpers';
import { address } from '../components/Address';

function getInfuraId() {
  return process.env.NEXT_PUBLIC_INFURA_ID;
}

const useWalletProviderDemo = () => {
  const address = useAppStore((state) => state.address);
  const [provider, setProvider] = useState<ProviderType>();
  const setAddress = useAppStore((state) => state.setAddress);
  const setSigner = useAppStore((state) => state.setSigner);

  const connect = useCallback(async () => {
    const isDemoEnv = isAppEnvDemo();
    if (isDemoEnv) {
      try {
        if (!address) {
          const newSigner = Wallet.createRandom();
          setSigner(newSigner);
          setAddress(newSigner.address as address);
          return newSigner;
        }
      } catch (e) {
        console.log('error', e);
      }
    }
  }, [address]);

  useEffect(() => {
    if (!provider) {
      setProvider(new ethers.providers.InfuraProvider('mainnet', getInfuraId()));
      connect();
    }
  }, [provider]);

  return {
    connect
  };
};

export default useWalletProviderDemo;
