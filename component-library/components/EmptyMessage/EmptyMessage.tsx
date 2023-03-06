import React from "react";
import { PillButton } from "../PillButton/PillButton";
import { emptyMessageSvg } from "./EmptyMessageGraphic";

export const EmptyMessage = () => (
  <div className="flex flex-col justify-center items-center h-screen">
    {emptyMessageSvg}
    <h2 className="text-xl font-bold">You&apos;ve got no messages</h2>
    <p className="my-4">Start a conversation to get going!</p>
    <PillButton label="Compose your first message" />
  </div>
);
