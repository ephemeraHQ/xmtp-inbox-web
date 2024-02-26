import { DeviceMobileIcon } from "@heroicons/react/solid";

const LinkEle = ({ url, text }: { url: string; text: string }) => (
  <a
    href={url}
    target="_blank"
    className="text-blue-600 m-1 text-center cursor-pointer"
    rel="noreferrer">
    {text}
  </a>
);

export const Mobile = () => (
  <div className="flex flex-col items-start justify-center h-screen p-8 text-left">
    <div className="flex flex-col w-full items-center">
      <DeviceMobileIcon width="100" className="text-indigo-600" />
      <h1 className="text-2xl font-bold">Looks like you&apos;re on mobile!</h1>
    </div>
    <p className="text-left mt-8">For mobile-friendly XMTP chat:</p>
    <ul className="list-disc m-4">
      <li className="ml-1">
        Try group chat on the dev network in Converse Preview:
      </li>
      <LinkEle url="https://testflight.apple.com/join/xEJOvzEx" text="iOS" />
      |
      <LinkEle
        url="https://drive.google.com/file/d/1rUtCmtIB6VzHNW8PDJ1TMBRuI2OEOdcg/view?usp=drive_link"
        text="Android"
      />
      <li className="ml-1">
        Try subscription notifications and 1:1 chats in Coinbase Wallet:
      </li>
      <LinkEle url="https://go.cb-w.com" text="iOS" />|
      <LinkEle url="https://go.cb-w.com" text="Android" />
      <li className="ml-1">
        Devs: Build on the open source reference implementation:
      </li>
      <LinkEle
        url="https://github.com/xmtp-labs/xmtp-inbox-mobile"
        text="XMTP React Native Reference App"
      />
    </ul>
  </div>
);
