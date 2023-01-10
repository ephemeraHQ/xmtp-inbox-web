import { Client } from '@xmtp/xmtp-js';
import { ethers, Signer } from 'ethers';
import create from 'zustand';

type ProviderType = ethers.providers.Web3Provider | ethers.providers.InfuraProvider | undefined;

interface AppState {
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
        client: undefined,
        address: undefined,
        signer: undefined
      };
    })
}));
