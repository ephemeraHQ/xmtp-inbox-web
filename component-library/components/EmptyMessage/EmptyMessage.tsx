import React from "react";
import { PillButton } from "../PillButton/PillButton";
import { emptyMessageSvg } from "./EmptyMessageGraphic";

interface EmptyMessageProps {
  /**
   * What should we run to trigger the first message being composed?
   */
  setStartedFirstMessage?: () => void;
}

export const EmptyMessage = ({ setStartedFirstMessage }: EmptyMessageProps) => (
  <div className="flex flex-col justify-center items-center h-screen">
    {emptyMessageSvg}
    <h2 className="text-xl font-bold">You&apos;ve got no messages</h2>
    <p className="my-4">Start a conversation to get going!</p>
    <PillButton
      label="Compose your first message"
      onClick={setStartedFirstMessage}
    />
  </div>
);
