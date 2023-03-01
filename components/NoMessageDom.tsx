import React from "react";
import { PillButton } from "../component-library/components/PillButton/PillButton";

const NoMessageDom = () => {
  return (
    <div className="h-full flex flex-col items-center text-center justify-center">
      <div>
        <img className="h-full w-auto" src="/no-msg.png" alt="No Messages" />
      </div>
      <div className="text-lg font-bold mt-8">{"You've got no messages"}</div>
      <div className="text-sm mt-1 mb-2">
        Start a conversation to get going!
      </div>
      <PillButton size="small" label="Compose your first message" />
    </div>
  );
};

export default NoMessageDom;
