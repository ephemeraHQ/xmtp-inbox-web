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

export type address = "0x${string}";

const Inbox: React.FC<{ children?: React.ReactNode }> = () => {
  useEffect(() => {
    if (!client) {
      router.push("/");
    }
  }, []);

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

  return (
    <div className="bg-white w-screen md:h-full flex flex-col md:flex-row">
      <div className="flex md:w-1/2 md:min-w-fit overflow-y-scroll">
        <SideNavWrapper />
        <div className="w-full max-w-lg flex flex-col h-screen overflow-scroll">
          {!loadingConversations && <HeaderDropdownWrapper />}
          <ConversationList
            isLoading={loadingConversations}
            messages={Array.from(conversations.values())
              .sort(orderByLatestMessage)
              .map((convo) => (
                <MessagePreviewCardWrapper convo={convo} />
              ))}
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-screen">
        <AddressInputWrapper />
        <div className="h-full w-full flex flex-col-reverse overflow-scroll">
          <FullConversationWrapper />
        </div>
        <MessageInputWrapper />
      </div>
    </div>
  );
};

export default Inbox;
