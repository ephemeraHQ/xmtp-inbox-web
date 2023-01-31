import { useEffect } from 'react';
import { Signer } from 'ethers';
import { useAppStore } from '../store/app';
import { useAccount, useSigner } from 'wagmi';

const useWalletProvider = () => {
  const { address } = useAccount();
  const { data: signer } = useSigner();
  const setAddress = useAppStore((state) => state.setAddress);
  const setSigner = useAppStore((state) => state.setSigner);

  useEffect(() => {
    setAddress(address);
    setSigner(signer as Signer);
  }, [signer, address]);
};

export default useWalletProvider;
