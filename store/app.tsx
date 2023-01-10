import { Client } from '@xmtp/xmtp-js';
import { ethers, Signer } from 'ethers';
import create from 'zustand';
import Web3Modal from 'web3modal';

type ProviderType = ethers.providers.Web3Provider | ethers.providers.InfuraProvider | undefined;

interface AppState {
  web3Modal: Web3Modal | undefined;
  setWeb3Modal: (web3Modal: Web3Modal | undefined) => void;
  signer: Signer | undefined;
  setSigner: (signer: Signer | undefined) => void;
  address: string | undefined;
  setAddress: (address: string | undefined) => void;
  provider: ProviderType;
  setProvider: (provider: ProviderType) => void;
  client: Client | undefined | null;
  setClient: (client: Client | undefined | null) => void;
  resetAppState: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  web3Modal: undefined,
  setWeb3Modal: (web3Modal: Web3Modal | undefined) => set(() => ({ web3Modal })),
  signer: undefined,
  setSigner: (signer: Signer | undefined) => set(() => ({ signer })),
  address: undefined,
  setAddress: (address: string | undefined) => set(() => ({ address })),
  provider: undefined,
  setProvider: (provider: ProviderType) => set(() => ({ provider })),
  client: undefined,
  setClient: (client: Client | undefined | null) => set(() => ({ client })),
  resetAppState: () =>
    set(() => {
      return {
        web3Modal: undefined,
        client: undefined,
        address: undefined,
        signer: undefined
      };
    })
}));
