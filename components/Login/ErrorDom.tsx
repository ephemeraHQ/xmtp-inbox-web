import { ExclamationIcon } from "@heroicons/react/solid";
import React from "react";
import { NegativePill } from "../../component-library/components/PillButton/PillButton.stories";
import {
  LoginPageHeaderText,
  LoginPageInfoText,
  LoginSubText,
} from "./LoginDomTextElements";

const ErrorDom = ({ cta }: { cta?: () => void }) => {
  return (
    <>
      <div>
        <ExclamationIcon className="text-red-600" width={64} />
      </div>
      <LoginPageHeaderText isLoading={false} text="Something went wrong..." />
      <LoginPageInfoText text="A properly detailed error message describing the error goes here." />
      <div className="mt-2">
        <NegativePill onClick={cta} label="Connect again" />
      </div>
      <LoginSubText />
    </>
  );
};

export default ErrorDom;
