import React, { useEffect } from "react";
import useListConversations from "../hooks/useListConversations";
import { useXmtpStore } from "../store/xmtp";
import { getConversationId } from "../helpers";
import { ConversationList } from "../component-library/components/ConversationList/ConversationList";
import { Conversation } from "@xmtp/xmtp-js";
import { MessagePreviewCardWrapper } from "../wrappers/MessagePreviewCardWrapper";
import { FullConversationWrapper } from "../wrappers/FullConversationWrapper";
import { AddressInputWrapper } from "../wrappers/AddressInputWrapper";
import { HeaderDropdownWrapper } from "../wrappers/HeaderDropdownWrapper";
import { MessageInputWrapper } from "../wrappers/MessageInputWrapper";
import { SideNavWrapper } from "../wrappers/SideNavWrapper";
import useInitXmtpClient from "../hooks/useInitXmtpClient";
import { LearnMore } from "../component-library/components/LearnMore/LearnMore";
import router from "next/router";
import useWindowSize from "../hooks/useWindowSize";
import { ChevronLeftIcon } from "@heroicons/react/outline";

export type address = "0x${string}";

const Inbox: React.FC<{ children?: React.ReactNode }> = () => {
  useInitXmtpClient();
  // XMTP Store
  const client = useXmtpStore((state) => state.client);
  const conversations = useXmtpStore((state) => state.conversations);

  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );

  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );

  const size = useWindowSize();

  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const recipientEnteredValue = useXmtpStore(
    (state) => state.recipientEnteredValue,
  );
  const setRecipientEnteredValue = useXmtpStore(
    (state) => state.setRecipientEnteredValue,
  );

  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );
  const startedFirstMessage = useXmtpStore(
    (state) => state.startedFirstMessage,
  );
  const setStartedFirstMessage = useXmtpStore(
    (state) => state.setStartedFirstMessage,
  );

  useEffect(() => {
    if (!client) {
      router.push("/");
    }
  }, [client]);

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
    <div className="bg-white w-full h-screen flex flex-col md:flex-row">
      {size[0] > 700 || (!recipientWalletAddress && !startedFirstMessage) ? (
        <div className="flex md:w-2/6 h-screen">
          <SideNavWrapper />
          <div className="flex flex-col h-screen w-full overflow-auto">
            {!loadingConversations && <HeaderDropdownWrapper />}
            <ConversationList
              hasRecipientEnteredValue={!!recipientEnteredValue}
              setStartedFirstMessage={() => setStartedFirstMessage(true)}
              isLoading={loadingConversations}
              messages={
                conversations.size === 0 && recipientEnteredValue
                  ? [<MessagePreviewCardWrapper key="default" />]
                  : Array.from(conversations.values())
                      .sort(orderByLatestMessage)
                      .map((convo) => (
                        <MessagePreviewCardWrapper
                          key={getConversationId(convo)}
                          convo={convo}
                        />
                      ))
              }
            />
          </div>
        </div>
      ) : null}
      {size[0] > 700 || recipientWalletAddress || startedFirstMessage ? (
        <div className="flex md:w-4/6 overflow-visible md:overflow-hidden flex-col h-screen">
          {!conversations.size &&
          !loadingConversations &&
          !startedFirstMessage ? (
            <LearnMore
              version={"replace"}
              setStartedFirstMessage={() => setStartedFirstMessage(true)}
            />
          ) : (
            <>
              <div className="flex">
                {size[0] < 700 ? (
                  <ChevronLeftIcon
                    onClick={() => {
                      setRecipientWalletAddress("");
                      setStartedFirstMessage(false);
                      setRecipientEnteredValue("");
                    }}
                    width={32}
                  />
                ) : null}
                <AddressInputWrapper />
              </div>
              <div className="h-[calc(100vh-7rem)] flex flex-col">
                <FullConversationWrapper />
              </div>
              <MessageInputWrapper />
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Inbox;
