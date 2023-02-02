import { useAccount, useConnect, useDisconnect as useDisconnectWagmi } from 'wagmi';
import { isAppEnvDemo } from '../helpers';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { MockConnector } from '@wagmi/core/connectors/mock';
import { Wallet } from 'ethers/lib';

const createWallet = (() => Wallet.createRandom())();

const useModalOrDemo = () => {
  const { openConnectModal } = useConnectModal();
  const { connect: connectWallet } = useConnect();
  const isDemo = isAppEnvDemo();
  const { connector } = useAccount();
  const mockConnector = !connector && isDemo && new MockConnector({ options: { signer: createWallet } });

  return {
    handleConnect: isDemo ? () => connectWallet({ connector: mockConnector }) : openConnectModal
  };
};

export default useModalOrDemo;
