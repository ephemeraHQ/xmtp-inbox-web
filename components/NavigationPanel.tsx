import { LinkIcon, ExclamationCircleIcon } from '@heroicons/react/outline';
import { ArrowSmRightIcon } from '@heroicons/react/solid';
import { useAppStore } from '../store/app';
import { useXmtpStore } from '../store/xmtp';
import ConversationsList from './ConversationsList';
import Loader from './Loader';

type NavigationPanelProps = {
  onConnect: () => Promise<void>;
  isError: boolean;
};

type ConnectButtonProps = {
  onConnect: () => Promise<void>;
  isError: boolean;
};

const NavigationPanel = ({ onConnect, isError }: NavigationPanelProps): JSX.Element => {
  const walletAddress = useAppStore((state) => state.address);
  const client = useAppStore((state) => state.client);

  return (
    <div className="flex-grow flex flex-col h-[calc(100vh-8rem)] overflow-y-auto">
      {walletAddress && client !== null ? (
        <ConversationsPanel />
      ) : (
        <NoWalletConnectedMessage isError={isError}>
          <ConnectButton onConnect={onConnect} isError={isError} />
        </NoWalletConnectedMessage>
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
      {children}
    </div>
  );
};

const ConnectButton = ({ onConnect, isError }: ConnectButtonProps): JSX.Element => {
  return (
    <button
      data-testid="no-wallet-connected-cta"
      onClick={onConnect}
      className="rounded border border-l-300 mx-auto my-4 text-l-300 hover:text-white hover:bg-l-400 hover:border-l-400 hover:fill-white focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-n-100 focus-visible:outline-none active:bg-l-500 active:border-l-500 active:text-l-100 active:ring-0"
    >
      <div className="flex items-center justify-center text-xs font-semibold px-4 py-1">
        {isError ? 'Connect again' : 'Connect your wallet'}
        <ArrowSmRightIcon className="h-4" />
      </div>
    </button>
  );
};

const ConversationsPanel = (): JSX.Element => {
  const client = useAppStore((state) => state.client);
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
