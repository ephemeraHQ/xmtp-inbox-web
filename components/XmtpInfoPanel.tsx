import packageJson from '../package.json';
import { classNames } from '../helpers';
import {
  LinkIcon,
  BookOpenIcon,
  UserGroupIcon,
  ChevronRightIcon,
  ArrowSmRightIcon
} from '@heroicons/react/solid';
import { useAccount } from 'wagmi';
import useHandleConnect from '../hooks/useHandleConnect';

type XmtpInfoRowProps = {
  icon: JSX.Element;
  headingText: string;
  subHeadingText: string;
  onClick?: (() => void) | (() => Promise<void>);
  disabled?: boolean;
  dataTestPrefix?: string;
  url?: string;
};

const InfoRow = ({
  icon,
  headingText,
  subHeadingText,
  onClick,
  disabled,
  dataTestPrefix,
  url
}: XmtpInfoRowProps): JSX.Element => (
  <a
    onClick={disabled ? undefined : onClick}
    href={url}
    target="_blank"
    rel="noreferrer"
    className={disabled ? 'cursor-auto' : 'cursor-pointer'}
    data-testid={`${dataTestPrefix}-section-link`}
  >
    <div
      className={classNames(
        disabled ? 'opacity-40' : '',
        'flex py-4 border border-x-0 border-y-zinc-50 justify-between items-stretch text-left'
      )}
    >
      <div className="h-10 w-10 bg-l-300 rounded-lg text-white p-2" data-testid={`${dataTestPrefix}-icon`}>
        {icon}
      </div>
      <div className="ml-3 flex-col justify-center text-md flex-1">
        <div className="font-semibold text-n-600" data-testid={`${dataTestPrefix}-header`}>
          {headingText}
        </div>
        <div className="text-n-300" data-testid={`${dataTestPrefix}-subheader`}>
          {subHeadingText}
        </div>
      </div>
      <div className="w-10 flex justify-end items-center pr-2">
        <ChevronRightIcon className="h-5" data-testid={`${dataTestPrefix}-arrow`} />
      </div>
    </div>
  </a>
);

const XmtpInfoPanel = (): JSX.Element => {
  const { address: walletAddress } = useAccount();

  const { handleConnect } = useHandleConnect();

  const InfoRows = [
    {
      icon: <LinkIcon />,
      headingText: 'Connect your wallet',
      subHeadingText: 'Verify your wallet to start using the XMTP protocol',
      disabled: !!walletAddress,
      dataTestPrefix: 'connect',
      onClick: handleConnect
    },
    {
      icon: <BookOpenIcon />,
      headingText: 'Read the docs',
      subHeadingText:
        'Check out the documentation for our protocol and find out how to get up and running quickly',
      url: 'https://docs.xmtp.org',
      dataTestPrefix: 'docs'
    },
    {
      icon: <UserGroupIcon />,
      headingText: 'Join our community',
      subHeadingText:
        'Talk about what you’re building or find out other projects that are building upon XMTP',
      url: 'https://community.xmtp.org',
      dataTestPrefix: 'community'
    }
  ];

  return (
    // The info panel is only shown in desktop layouts.
    <div className="hidden md:block m-auto w-[464px]">
      <div className="pb-6">
        <div className="text-xl text-n-600 font-semibold mb-1" data-testid="get-started-header">
          Welcome to the web3 communication protocol
        </div>
        <div className="text-md text-n-300" data-testid="get-started-subheader">
          Get started by reading the docs or joining the community
        </div>
      </div>
      <div>
        {InfoRows.map((info, index) => {
          return (
            <InfoRow
              key={index}
              icon={info.icon}
              headingText={info.headingText}
              subHeadingText={info.subHeadingText}
              disabled={info.disabled}
              dataTestPrefix={info.dataTestPrefix}
              url={info.url}
              onClick={info.onClick}
            />
          );
        })}
      </div>
      <div className="flex justify-between items-center mt-4">
        <div className="text-n-600 text-sm" data-testid="xmtp-version">
          xmtp-js v{packageJson.dependencies['@xmtp/xmtp-js'].substring(1)}
        </div>
        <a
          href="https://blog.xmtp.com/contact/"
          target="_blank"
          className="text-l-300 font-semibold text-md flex items-center"
          rel="noreferrer"
          data-testid="help-cta"
        >
          I need help <ArrowSmRightIcon className="h-5 fill-l-300" />
        </a>
      </div>
    </div>
  );
};

export default XmtpInfoPanel;
