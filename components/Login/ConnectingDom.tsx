import React from "react";
import Loader from "../Loader";

const ConnectingDom = () => {
  return (
    <div>
      <Loader isLoading={true} />
      <div className="font-bold text-3xl mt-8">
        Connecting to your wallet...
      </div>
      <div className="text-lg mt-2">
        Look for a signature dialog in the wallet you previously selected.
      </div>
      <div className="text-base mt-2 font-bold text-gray-700">
        No private keys will be shared
      </div>
    </div>
  );
};

export default ConnectingDom;
