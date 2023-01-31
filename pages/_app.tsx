import '../styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { infuraProvider } from 'wagmi/providers/infura';
import { publicProvider } from 'wagmi/providers/public';

const AppWithoutSSR = dynamic(() => import('../components/App'), {
  ssr: false
});

function AppWrapper({ Component, pageProps }: AppProps) {
  const { chains, provider } = configureChains(
    [mainnet],
    [infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_ID ?? '' }), publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: 'XMTP Inbox Web',
    chains
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <AppWithoutSSR>
          <Component {...pageProps} />
        </AppWithoutSSR>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default AppWrapper;
