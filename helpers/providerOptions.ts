import WalletConnectProvider from '@walletconnect/web3-provider';
import WalletLink from 'walletlink';
import { IProviderOptions, providers } from 'web3modal';

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId
    }
  }
};
if (!window.ethereum || (window.ethereum && !window.ethereum.isCoinbaseWallet)) {
  providerOptions.walletlink = {
    package: WalletLink,
    options: {
      appName: 'Chat via XMTP',
      infuraId
      // darkMode: false,
    }
  };
}
if (!window.ethereum || !window.ethereum?.isMetaMask) {
  providerOptions['custom-metamask'] = {
    display: {
      logo: providers.METAMASK.logo,
      name: 'Install MetaMask',
      description: 'Connect using browser wallet'
    },
    package: {},
    connector: async () => {
      window.open('https://metamask.io');
    }
  };
}

export default providerOptions;
