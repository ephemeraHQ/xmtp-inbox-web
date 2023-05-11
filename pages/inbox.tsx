import React, { useEffect } from "react";
import { useXmtpStore } from "../store/xmtp";
import { TAILWIND_MD_BREAKPOINT, wipeKeys } from "../helpers";
import { FullConversationWrapper } from "../wrappers/FullConversationWrapper";
import { AddressInputWrapper } from "../wrappers/AddressInputWrapper";
import { HeaderDropdownWrapper } from "../wrappers/HeaderDropdownWrapper";
import { MessageInputWrapper } from "../wrappers/MessageInputWrapper";
import { SideNavWrapper } from "../wrappers/SideNavWrapper";
import { LearnMore } from "../component-library/components/LearnMore/LearnMore";
import router from "next/router";
import useWindowSize from "../hooks/useWindowSize";
import { useClient } from "@xmtp/react-sdk";
import { useDisconnect, useSigner } from "wagmi";
import { ConversationListWrapper } from "../wrappers/ConversationListWrapper";

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
  const conversationId = useXmtpStore((state) => state.conversationId);

  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );

  const size = useWindowSize();

  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );
  const startedFirstMessage = useXmtpStore(
    (state) => state.startedFirstMessage,
  );
  const setStartedFirstMessage = useXmtpStore(
    (state) => state.setStartedFirstMessage,
  );

  const { disconnect: disconnectWagmi, reset: resetWagmi } = useDisconnect();

  // if the wallet address changes, disconnect the XMTP client
  useEffect(() => {
    const checkSigners = async () => {
      const address1 = await signer?.getAddress();
      const address2 = await clientSigner?.getAddress();
      // addresses must be defined before comparing
      if (address1 && address2 && address1 !== address2) {
        resetXmtpState();
        disconnect();
        wipeKeys(address1 ?? "");
        disconnectWagmi();
        resetWagmi();
      }
    };
    checkSigners();
  }, [clientSigner, disconnect, resetXmtpState, signer]);

  if (!client) {
    return <div />;
  }

  return (
    <div className="bg-white w-full md:h-full overflow-auto flex flex-col md:flex-row">
      <div className="flex md:w-1/2 md:max-w-md">
        {size[0] > TAILWIND_MD_BREAKPOINT ||
        (!recipientWalletAddress && !startedFirstMessage) ? (
          <>
            <SideNavWrapper />
            <div className="flex flex-col w-full h-screen overflow-y-auto">
              <HeaderDropdownWrapper />
              <ConversationListWrapper
                setStartedFirstMessage={setStartedFirstMessage}
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
                {conversationId && <FullConversationWrapper />}
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
