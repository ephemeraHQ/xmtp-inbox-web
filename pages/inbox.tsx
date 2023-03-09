import React, { useEffect } from "react";
import useListConversations from "../hooks/useListConversations";
import { useXmtpStore } from "../store/xmtp";
import { getConversationId } from "../helpers";
import { ConversationList } from "../component-library/components/ConversationList/ConversationList";
import { Conversation } from "@xmtp/xmtp-js";
import router from "next/router";
import { MessagePreviewCardWrapper } from "../wrappers/MessagePreviewCardWrapper";
import { FullConversationWrapper } from "../wrappers/FullConversationWrapper";
import { AddressInputWrapper } from "../wrappers/AddressInputWrapper";
import { HeaderDropdownWrapper } from "../wrappers/HeaderDropdownWrapper";
import { MessageInputWrapper } from "../wrappers/MessageInputWrapper";
import { SideNavWrapper } from "../wrappers/SideNavWrapper";
import useInitXmtpClient from "../hooks/useInitXmtpClient";

export type address = "0x${string}";

const Inbox: React.FC<{ children?: React.ReactNode }> = () => {
  useInitXmtpClient();
  // XMTP Store
  const client = useXmtpStore((state) => state.client);
  const conversations = useXmtpStore((state) => state.conversations);

  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );

  // XMTP Hooks
  useListConversations();

  const orderByLatestMessage = (
    convoA: Conversation,
    convoB: Conversation,
  ): number => {
    const convoALastMessageDate =
      previewMessages.get(getConversationId(convoA))?.sent || new Date();
    const convoBLastMessageDate =
      previewMessages.get(getConversationId(convoB))?.sent || new Date();
    return convoALastMessageDate < convoBLastMessageDate ? 1 : -1;
  };

  // useEffect(() => {
  //   if (!client) {
  //     router.push("/");
  //   }
  // }, [client]);

  return (
    <div className="bg-white w-screen md:h-full flex flex-col md:flex-row">
      <div className="flex md:w-2/5 overflow-y-scroll">
        <SideNavWrapper />
        <div className="w-full max-w-lg flex flex-col h-screen overflow-scroll">
          {!loadingConversations && <HeaderDropdownWrapper />}
          <ConversationList
            isLoading={loadingConversations}
            messages={Array.from(conversations.values())
              .sort(orderByLatestMessage)
              .map((convo) => (
                <MessagePreviewCardWrapper
                  key={getConversationId(convo)}
                  convo={convo}
                />
              ))}
          />
        </div>
      </div>
      <div className="flex w-full flex-col h-screen">
        <AddressInputWrapper />
        <div className="h-[calc(100vh-8rem)] flex flex-col">
          <FullConversationWrapper />
        </div>
        <MessageInputWrapper />
      </div>
    </div>
  );
};

export default Inbox;
