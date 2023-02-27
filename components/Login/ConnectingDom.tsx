import React from "react";
import { classNames } from "../../helpers";
import Loader from "../Loader";

export const LoginPageHeaderText = ({
  text,
  marginTop,
}: {
  text: string;
  marginTop?: string;
}) => (
  <div
    className={classNames(
      "font-bold",
      "text-3xl",
      "text-center",
      `mt-${marginTop ?? 0}`,
    )}>
    {text}
  </div>
);

export const LoginPageInfoText = ({ text }: { text: string }) => (
  <div className="text-lg mt-2 text-center">{text}</div>
);

export const LoginSubText = () => (
  <div className="text-base mt-2 font-bold text-gray-700">
    No private keys will be shared
  </div>
);

const ConnectingDom = () => {
  return (
    <div>
      <Loader isLoading={true} />
      <LoginPageHeaderText
        text="Connecting to your wallet..."
        marginTop="32px"
      />
      <LoginPageInfoText text="Look for a signature dialog in the wallet you previously selected." />
      <LoginSubText />
    </div>
  );
};

export default ConnectingDom;
