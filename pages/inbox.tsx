import React, { useEffect } from "react";
import useListConversations from "../hooks/useListConversations";
import { useXmtpStore } from "../store/xmtp";
import {
  getConversationId,
  TAILWIND_MD_BREAKPOINT,
  XMTP_FEEDBACK_ADDRESS,
} from "../helpers";
import { ConversationList } from "../component-library/components/ConversationList/ConversationList";
import { Conversation } from "@xmtp/xmtp-js";
import { MessagePreviewCardWrapper } from "../wrappers/MessagePreviewCardWrapper";
import { FullConversationWrapper } from "../wrappers/FullConversationWrapper";
import { AddressInputWrapper } from "../wrappers/AddressInputWrapper";
import { HeaderDropdownWrapper } from "../wrappers/HeaderDropdownWrapper";
import { MessageInputWrapper } from "../wrappers/MessageInputWrapper";
import { SideNavWrapper } from "../wrappers/SideNavWrapper";
import { LearnMore } from "../component-library/components/LearnMore/LearnMore";
import router from "next/router";
import useWindowSize from "../hooks/useWindowSize";
import { useClient } from "@xmtp/react-sdk";
import { useSigner } from "wagmi";

export type address = "0x${string}";

const Inbox: React.FC<{ children?: React.ReactNode }> = () => {
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);
  const { client, disconnect, signer: clientSigner } = useClient();

  useEffect(() => {
    if (!client) {
      router.push("/");
    }
  }, [client]);

  const { data: signer } = useSigner();
  // XMTP Store
  const conversations = useXmtpStore((state) => state.conversations);

  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );

  const size = useWindowSize();

  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const recipientEnteredValue = useXmtpStore(
    (state) => state.recipientEnteredValue,
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

  // if the wallet address changes, disconnect the XMTP client
  useEffect(() => {
    const checkSigners = async () => {
      const address1 = await signer?.getAddress();
      const address2 = await clientSigner?.getAddress();
      // addresses must be defined before comparing
      if (address1 && address2 && address1 !== address2) {
        resetXmtpState();
        disconnect();
      }
    };
    checkSigners();
  }, [clientSigner, disconnect, resetXmtpState, signer]);

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
    <div className="bg-white w-full md:h-full overflow-auto flex flex-col md:flex-row">
      <div className="flex md:w-1/2 md:max-w-md">
        {size[0] > TAILWIND_MD_BREAKPOINT ||
        (!recipientWalletAddress && !startedFirstMessage) ? (
          <>
            <SideNavWrapper />
            <div className="flex flex-col w-full h-screen overflow-y-auto">
              <HeaderDropdownWrapper />
              <ConversationList
                hasRecipientEnteredValue={!!recipientEnteredValue}
                setStartedFirstMessage={() => setStartedFirstMessage(true)}
                isLoading={loadingConversations}
                messages={
                  !loadingConversations
                    ? [
                        <MessagePreviewCardWrapper
                          key={XMTP_FEEDBACK_ADDRESS}
                          convo={conversations.get(XMTP_FEEDBACK_ADDRESS)}
                        />,
                        ...Array.from(conversations.values())
                          .sort(orderByLatestMessage)
                          .filter(
                            (convo) =>
                              convo.peerAddress !== XMTP_FEEDBACK_ADDRESS,
                          )
                          .map((convo) => (
                            <MessagePreviewCardWrapper
                              key={getConversationId(convo)}
                              convo={convo}
                            />
                          )),
                        ,
                      ]
                    : []
                }
              />
            </div>
          </>
        ) : null}
      </div>
      {size[0] > TAILWIND_MD_BREAKPOINT ||
      recipientWalletAddress ||
      startedFirstMessage ? (
        <div className="flex w-full flex-col h-screen overflow-hidden">
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
                <AddressInputWrapper />
              </div>
              <div className="h-full overflow-auto flex flex-col">
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
