import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import React from "react";
import { Button } from "../component-library/Button";

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
      <Button
        buttonSize="small"
        category="text"
        label="Compose your first message"
        icon={<ArrowCircleRightIcon width={20} />}
      />
    </div>
  );
};

export default NoMessageDom;
