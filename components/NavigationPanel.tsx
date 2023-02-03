import { LinkIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import { useXmtpStore } from '../store/xmtp';
import ConversationsList from './ConversationsList';
import Loader from './Loader';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import useHandleConnect from '../hooks/useHandleConnect';

type NavigationPanelProps = {
  isError: boolean;
};

const NavigationPanel = ({ isError }: NavigationPanelProps): JSX.Element => {
  const { address } = useAccount();
  const client = useXmtpStore((state) => state.client);
  const { handleConnect } = useHandleConnect();

  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-8rem)] overflow-y-auto">
      {address && client !== null ? (
        <ConversationsPanel />
      ) : (
        <>
          {address ? (
            <button onClick={() => {}}>Connect To Xmtp</button>
          ) : (
            <NoWalletConnectedMessage isError={isError}>
              <ConnectButton.Custom>
                {({ account, chain, mounted }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;
                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              type="button"
                              className="bg-p-600 px-4 rounded-lg h-[40px] text-white font-bold"
                              onClick={handleConnect}
                              data-testid="no-wallet-connected-cta"
                            >
                              Connect Wallet
                            </button>
                          );
                        }
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
            </NoWalletConnectedMessage>
          )}
        </>
      )}
    </div>
  );
};

const NoWalletConnectedMessage: React.FC<{ isError: boolean; children?: React.ReactNode }> = ({
  isError,
  children
}) => {
  return (
    <div className="flex flex-col flex-grow justify-center">
      <div className="flex flex-col items-center px-4 text-center">
        {isError ? (
          <ExclamationCircleIcon className="h-8 w-8" aria-hidden="true" />
        ) : (
          <LinkIcon
            className="h-8 w-8 mb-1 stroke-n-200 md:stroke-n-300"
            aria-hidden="true"
            data-testid="no-wallet-connected-icon"
          />
        )}
        <p
          className="text-xl md:text-lg text-n-200 md:text-n-300 font-bold"
          data-testid="no-wallet-connected-header"
        >
          {isError ? 'Error connecting' : 'No wallet connected'}
        </p>
        <p className="text-lx md:text-md text-n-200 font-normal" data-testid="no-wallet-connected-subheader">
          {isError ? 'Please try again' : 'Please connect a wallet to begin'}
        </p>
      </div>
      <div className="mt-2 flex justify-center items-center">{children}</div>
    </div>
  );
};

const ConversationsPanel = (): JSX.Element => {
  const client = useXmtpStore((state) => state.client);
  const loadingConversations = useXmtpStore((state) => state.loadingConversations);

  if (client === undefined) {
    return <Loader headingText="Awaiting signatures..." subHeadingText="Use your wallet to sign" isLoading />;
  }

  if (loadingConversations) {
    return <Loader headingText="Loading conversations..." subHeadingText="Please wait a moment" isLoading />;
  }

  return (
    <nav className="flex-1 pb-4" data-testid="conversations-list-panel">
      <ConversationsList />
    </nav>
  );
};

export default NavigationPanel;
