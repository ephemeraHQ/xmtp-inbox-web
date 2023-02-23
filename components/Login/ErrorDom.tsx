import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import { ExclamationIcon } from "@heroicons/react/solid";
import React from "react";
import { Button } from "../../component-library/Button";

const ErrorDom = ({ cta }: { cta?: () => void }) => {
  return (
    <>
      <div>
        <ExclamationIcon className="text-red-600" width={64} />
      </div>
      <div className="font-bold text-3xl text-center">
        Something went wrong...
      </div>
      <div className="text-lg mt-2 text-center">
        {"A properly detailed error message describing the error goes here."}
      </div>
      <div className="mt-2">
        <Button
          onClick={cta}
          category="text"
          primary={false}
          label="Connect again"
          icon={<ArrowCircleRightIcon width={20} />}
        />
      </div>
      <div className="text-sm mt-2 font-bold">
        No private keys will be shared
      </div>
    </>
  );
};

export default ErrorDom;
