import Head from 'next/head';
import Link from 'next/link';
import { useAccount, useConnect, useSigner } from 'wagmi';
import { NavigationView, ConversationView } from './Views';
import { RecipientControl } from './Conversation';
import NewMessageButton from './NewMessageButton';
import NavigationPanel from './NavigationPanel';
import XmtpInfoPanel from './XmtpInfoPanel';
import UserMenu from './UserMenu';
import React, { useCallback, useEffect } from 'react';
import useListConversations from '../hooks/useListConversations';
import { isAppEnvDemo } from '../helpers';
import useDisconnect from '../hooks/useDisconnect';
import { useXmtpStore } from '../store/xmtp';
import { Wallet } from 'ethers';
import { MockConnector } from '@wagmi/core/connectors/mock';
import { watchAccount } from '@wagmi/core';
import useInitXmtpClient from '../hooks/useInitXmtpClient';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const client = useXmtpStore((state) => state.client);
  const { address: walletAddress } = useAccount();
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  useInitXmtpClient();

  const { connect: connectWallet, error } = useConnect();

  const { disconnect: disconnectWallet } = useDisconnect();

  useListConversations();

  const handleDisconnect = useCallback(async () => {
    await disconnectWallet();
  }, [disconnectWallet]);

  useEffect(() => {
    const isDemoEnv = isAppEnvDemo();
    if (isDemoEnv) {
      const wallet = Wallet.createRandom();
      const connector = new MockConnector({ options: { signer: wallet } });
      connectWallet({ connector });
    }
    watchAccount(() => {
      resetXmtpState();
    });
  }, []);

  return (
    <>
      <Head>
        <title>Chat via XMTP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div>
        <NavigationView>
          <aside className="flex w-full md:w-84 flex-col flex-grow fixed inset-y-0">
            <div className="flex flex-col flex-grow md:border-r md:border-gray-200 bg-white overflow-y-auto">
              <div className="max-h-16 min-h-[4rem] bg-p-600 flex items-center justify-between flex-shrink-0 px-4">
                <Link href="/" passHref={true}>
                  <img className="h-8 w-auto" src="/xmtp-icon.png" alt="XMTP" data-testid="xmtp-logo" />
                </Link>
                {walletAddress && client && <NewMessageButton />}
              </div>
              {<NavigationPanel isError={error ? true : false} />}
              <UserMenu onDisconnect={handleDisconnect} isError={error ? true : false} />
            </div>
          </aside>
        </NavigationView>
        <ConversationView>
          {walletAddress && client ? (
            <>
              <div className="flex bg-zinc-50 border-b border-gray-200 md:bg-white md:border-0 max-h-16 min-h-[4rem]">
                <RecipientControl />
              </div>
              {children}
            </>
          ) : (
            <XmtpInfoPanel />
          )}
        </ConversationView>
      </div>
    </>
  );
};

export default Layout;
