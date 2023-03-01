import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import { ExclamationIcon } from "@heroicons/react/solid";
import React from "react";
import { Button } from "../../component-library/Button";
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
        <Button
          onClick={cta}
          category="text"
          primary={false}
          label="Connect again"
          icon={<ArrowCircleRightIcon width={20} />}
        />
      </div>
      <LoginSubText />
    </>
  );
};

export default ErrorDom;
