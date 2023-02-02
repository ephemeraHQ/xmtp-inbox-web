import { Menu, Transition } from '@headlessui/react';
import { CogIcon } from '@heroicons/react/solid';
import { Fragment, useState } from 'react';
import { classNames, tagStr } from '../helpers';
import Address from './Address';
import { Tooltip } from './Tooltip/Tooltip';
import packageJson from '../package.json';
import Avatar from './Avatar';
import QRCode from 'react-qr-code';
import { Modal } from './Modal';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import { useXmtpStore } from '../store/xmtp';
import { useAccount, useDisconnect } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

type UserMenuProps = {
  isError: boolean;
};

const NotConnected = ({ isError }: UserMenuProps): JSX.Element => {
  const { openConnectModal: handleConnect } = useConnectModal();
  return (
    <>
      <div>
        <div className="flex items-center">
          <div className="bg-y-100 rounded-full h-2 w-2 mr-1"></div>
          <p className="text-sm font-bold text-y-100" data-testid="no-wallet-connected-footer-primary-text">
            {isError ? 'Error connecting' : 'You are not connected.'}
          </p>
        </div>
        <button
          onClick={handleConnect}
          className="text-sm font-normal text-y-100 hover:text-y-200 ml-3 cursor-pointer"
          data-testid="no-wallet-connected-footer-secondary-text"
        >
          {isError ? 'Try connecting again' : 'Sign in with your wallet'}
        </button>
      </div>
      <button
        className="max-w-xs flex items-center text-sm rounded focus:outline-none"
        onClick={handleConnect}
      >
        <span className="sr-only">Connect</span>
        <CogIcon
          className="h-6 w-6 md:h-5 md:w-5 fill-n-100 hover:fill-n-200"
          aria-hidden="true"
          data-testid="settings-icon"
        />
      </button>
    </>
  );
};

const UserMenu = ({ isError }: UserMenuProps): JSX.Element => {
  const { address: walletAddress } = useAccount();
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const client = useXmtpStore((state) => state.client);
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();

  const onClickCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
    }
  };

  const onShareAddress = () => {
    setShowQrModal(true);
  };

  const userDmLink = `${window.location.origin}/dm/${walletAddress}`;

  return (
    <div
      className={`flex ${
        tagStr() ? 'bg-p-600' : 'bg-n-500'
      } items-center justify-between rounded-lg max-h-16 min-h-[4rem] px-4 py-2 m-2 mt-0 drop-shadow-xl`}
    >
      {walletAddress && client !== null ? (
        <Menu>
          {({ open }) => (
            <>
              <div className={classNames(open ? 'opacity-75' : '', 'flex items-center')}>
                {walletAddress ? (
                  <>
                    <Avatar peerAddress={walletAddress} />
                    <div className="flex flex-col ml-3">
                      <div className="flex items-center">
                        <div className="bg-g-100 rounded h-2 w-2 mr-1"></div>
                        <p
                          className="text-sm font-bold text-g-100"
                          data-testid="connected-footer-primary-text"
                        >
                          Connected as:
                        </p>
                      </div>
                      <Address
                        address={walletAddress}
                        className="text-md leading-4 font-semibold text-white ml-[12px]"
                      />
                    </div>
                  </>
                ) : (
                  <div className="h-14 flex flex-col flex-1 justify-center">
                    <div className="flex items-center">
                      <div className="bg-p-100 rounded h-2 w-2 mr-1"></div>
                      <p className="text-sm font-bold text-p-100">Connecting...</p>
                    </div>
                    <p className="text-sm font-normal text-p-100 ml-3">Verifying your wallet</p>
                  </div>
                )}
              </div>
              <div className="flex items-center">
                {tagStr() && (
                  <Tooltip message="You are connected to the dev network">
                    <div className="bg-p-200 font-bold mr-1 text-sm p-1 rounded cursor-pointer">
                      {tagStr()}
                    </div>
                  </Tooltip>
                )}
                <div>
                  <Menu.Button className="max-w-xs flex items-center text-sm rounded-full focus:outline-none">
                    <span className="sr-only">Open user menu</span>
                    <CogIcon
                      className={classNames(
                        open ? 'fill-white' : '',
                        'h-6 w-6 md:h-5 md:w-5 fill-n-100 hover:fill-n-200'
                      )}
                      data-testid="settings-icon"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-bottom-right absolute right-0 bottom-12 mb-4 w-40 rounded-md shadow-lg bg-white divide-y-2 divide-zinc-50 ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        <span
                          className="block rounded-md px-2 py-2 text-sm text-n-600 text-right font-normal"
                          data-testid="xmtp-version"
                        >
                          xmtp-js v{packageJson.dependencies['@xmtp/xmtp-js'].substring(1)}
                        </span>
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={onClickCopy}
                            className={classNames(
                              active ? 'bg-zinc-50' : '',
                              'block rounded-md px-2 py-2 text-sm text-n-600 text-right font-normal cursor-pointer'
                            )}
                            data-testid="copy-address-cta"
                          >
                            Copy wallet address
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            data-modal-target="qrModal"
                            data-modal-toggle="qrModal"
                            onClick={onShareAddress}
                            className={classNames(
                              active ? 'bg-zinc-50' : '',
                              'block rounded-md px-2 py-2 text-sm text-n-600 text-right font-normal cursor-pointer'
                            )}
                            type="button"
                          >
                            Share Wallet Address
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={() => {
                              disconnectWagmi();
                              resetWagmi();
                              resetXmtpState();
                            }}
                            className={classNames(
                              active ? 'bg-zinc-50 cursor-pointer' : '',
                              'block rounded-md px-2 py-2 text-sm text-l-300 text-right font-semibold'
                            )}
                            data-testid="disconnect-wallet-cta"
                          >
                            Disconnect wallet
                          </a>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </div>
            </>
          )}
        </Menu>
      ) : (
        <NotConnected isError={isError} />
      )}
      <Modal title="Share QR Code" size="md" show={showQrModal} onClose={() => setShowQrModal(false)}>
        <div className="flex justify-center p-5 flex-col items-center">
          <QRCode value={userDmLink} />
          <div
            className="flex text-sm text-p-300 cursor-pointer mt-4"
            onClick={() => navigator.clipboard.writeText(userDmLink)}
          >
            {userDmLink}
            <ClipboardCopyIcon className="w-4 h-4 ml-2" />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserMenu;
