import React from "react";
import { classNames } from "../../helpers";

export const LoginPageHeaderText = ({
  text,
  isLoading,
  stepNumber,
}: {
  text: string;
  isLoading: boolean;
  stepNumber?: string;
}) => (
  <>
    {stepNumber && (
      <div
        className={classNames(
          "text-base",
          isLoading ? "mt-[12px]" : "mt-[-172px]",
        )}>
        Step {stepNumber} of 2
      </div>
    )}
    <div
      className={classNames(
        "font-bold",
        "text-3xl",
        "text-center",
        !stepNumber ? (isLoading ? "mt-[12px]" : "mt-[-172px]") : null,
      )}>
      {text}
    </div>
  </>
);

export const LoginPageInfoText = ({ text }: { text: string }) => (
  <div className="text-lg mt-2 text-center">{text}</div>
);

export const LoginSubText = () => (
  <div className="text-base mt-2 font-bold text-gray-700">
    No private keys will be shared
  </div>
);
