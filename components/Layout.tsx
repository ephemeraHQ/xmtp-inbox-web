import Head from 'next/head';
import Link from 'next/link';
import { useAccount, useConnect } from 'wagmi';
import { watchAccount } from '@wagmi/core';
import { NavigationView, ConversationView } from './Views';
import { RecipientControl } from './Conversation';
import NewMessageButton from './NewMessageButton';
import NavigationPanel from './NavigationPanel';
import XmtpInfoPanel from './XmtpInfoPanel';
import UserMenu from './UserMenu';
import React, { useEffect, useState } from 'react';
import useListConversations from '../hooks/useListConversations';
import { useXmtpStore } from '../store/xmtp';
import useInitXmtpClient from '../hooks/useInitXmtpClient';
import useWindowSize from '../hooks/useWindowSize';

const Layout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const client = useXmtpStore((state) => state.client);
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const recipientWalletAddress = useXmtpStore((state) => state.recipientWalletAddress);
  const { address: walletAddress } = useAccount();
  const [showMessageView, setShowMessageView] = useState(walletAddress && client);
  const size = useWindowSize();
  useInitXmtpClient();

  const { error } = useConnect();
  useListConversations();

  useEffect(() => {
    watchAccount(() => resetXmtpState());
  }, []);

  return (
    <>
      <Head>
        <title>Chat via XMTP</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div>
        {size[0] > 600 ? (
          <>
            <NavigationView>
              <aside className="flex w-full md:w-84 flex-col flex-grow fixed inset-y-0">
                <div className="flex flex-col flex-grow md:border-r md:border-gray-200 bg-white overflow-y-auto">
                  <div className="max-h-16 min-h-[4rem] bg-p-600 flex items-center justify-between flex-shrink-0 px-4">
                    <Link href="/" passHref={true}>
                      <img className="h-8 w-auto" src="/xmtp-icon.png" alt="XMTP" data-testid="xmtp-logo" />
                    </Link>
                    {walletAddress && client && <NewMessageButton setShowMessageView={setShowMessageView} />}
                  </div>
                  {<NavigationPanel isError={!!error} />}
                  <UserMenu isError={!!error} setShowMessageView={setShowMessageView} />
                </div>
              </aside>
            </NavigationView>
            <ConversationView>
              {walletAddress && client ? (
                <>
                  <div className="flex bg-zinc-50 border-b border-gray-200 md:bg-white md:border-0 max-h-16 min-h-[4rem]">
                    <RecipientControl setShowMessageView={setShowMessageView} />
                  </div>
                  {children}
                </>
              ) : (
                <XmtpInfoPanel />
              )}
            </ConversationView>
          </>
        ) : showMessageView || recipientWalletAddress ? (
          <ConversationView>
            {walletAddress && client ? (
              <>
                <div className="flex bg-zinc-50 border-b border-gray-200 md:bg-white md:border-0 max-h-16 min-h-[4rem]">
                  <RecipientControl setShowMessageView={setShowMessageView} />
                </div>
                {children}
              </>
            ) : (
              <XmtpInfoPanel />
            )}
          </ConversationView>
        ) : (
          <NavigationView>
            <aside className="flex w-full md:w-84 flex-col flex-grow fixed inset-y-0">
              <div className="flex flex-col flex-grow md:border-r md:border-gray-200 bg-white overflow-y-auto">
                <div className="max-h-16 min-h-[4rem] bg-p-600 flex items-center justify-between flex-shrink-0 px-4">
                  <Link href="/" passHref={true}>
                    <img className="h-8 w-auto" src="/xmtp-icon.png" alt="XMTP" data-testid="xmtp-logo" />
                  </Link>
                  {walletAddress && client && <NewMessageButton setShowMessageView={setShowMessageView} />}
                </div>
                {<NavigationPanel isError={!!error} />}
                <UserMenu isError={!!error} setShowMessageView={setShowMessageView} />
              </div>
            </aside>
          </NavigationView>
        )}
      </div>
    </>
  );
};

export default Layout;
