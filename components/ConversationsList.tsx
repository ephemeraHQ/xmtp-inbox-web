import React, { useEffect } from "react";
import { ChatIcon } from "@heroicons/react/outline";
import Address, { address } from "./Address";
import { Conversation } from "@xmtp/xmtp-js";
import {
  classNames,
  formatDate,
  getConversationId,
  isEnsAddress,
} from "../helpers";
import Avatar from "./Avatar";
import { useXmtpStore } from "../store/xmtp";
import { useAccount } from "wagmi";
import { fetchEnsAddress } from "@wagmi/core";

type ConversationTileProps = {
  conversation: Conversation;
};

const ConversationTile = ({
  conversation,
}: ConversationTileProps): JSX.Element | null => {
  const { address } = useAccount();
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const conversationId = useXmtpStore((state) => state.conversationId);
  const setConversationId = useXmtpStore((state) => state.setConversationId);

  const conversationKey = getConversationId(conversation);

  const onClick = () => {
    setRecipientWalletAddress(conversation.peerAddress);
    setConversationId(conversationKey);
  };

  useEffect(() => {
    const resolveRouting = async () => {
      const path = window?.location?.pathname ?? "";
      if (path.includes("/dm/")) {
        let convoKey = path.split("/dm/")[1];
        if (isEnsAddress(convoKey)) {
          const address = await fetchEnsAddress({
            name: convoKey,
          });
          convoKey = address ?? "";
        }
        if (convoKey !== "" && convoKey === conversationKey) {
          setRecipientWalletAddress(conversation.peerAddress);
          setConversationId(conversationKey);
          window.history.replaceState(
            {},
            "Chat Via XMTP",
            window.location.href.split("/dm/")[0],
          );
        }
      }
    };
    resolveRouting();
  }, [window?.location?.pathname]);

  if (!previewMessages.get(conversationKey)) {
    return null;
  }

  const latestMessage = previewMessages.get(conversationKey);

  const conversationDomain =
    conversation.context?.conversationId.split("/")[0] ?? "";

  const isSelected = conversationId === conversationKey;

  if (!latestMessage) {
    return null;
  }

  return (
    <div
      onClick={onClick}
      className={classNames(
        "h-20",
        "py-2",
        "px-4",
        "md:max-w-sm",
        "mx-auto",
        "bg-white",
        "space-y-2",
        "py-2",
        "flex",
        "items-center",
        "space-y-0",
        "space-x-4",
        "border-b-2",
        "border-gray-100",
        "hover:bg-bt-100",
        "cursor-pointer",
        loadingConversations ? "opacity-80" : "opacity-100",
        isSelected ? "bg-bt-200" : null,
      )}>
      <Avatar peerAddress={conversation.peerAddress as address} />
      <div className="py-4 sm:text-left text w-full">
        {conversationDomain && (
          <div className="text-sm rounded-2xl text-white bg-black w-max px-2 font-bold">
            {conversationDomain.toLocaleUpperCase()}
          </div>
        )}
        <div className="grid-cols-2 grid">
          <Address
            address={conversation.peerAddress as address}
            className="text-black text-lg md:text-md font-bold place-self-start"
          />
          <span
            className={classNames(
              "text-sm font-normal place-self-end",
              isSelected ? "text-n-500" : "text-n-300",
              loadingConversations ? "animate-pulse" : "",
            )}>
            {formatDate(latestMessage?.sent)}
          </span>
        </div>
        <span className="text-sm text-gray-500 line-clamp-1 break-all">
          {address === latestMessage?.senderAddress && "You: "}{" "}
          {latestMessage?.content}
        </span>
      </div>
    </div>
  );
};

const ConversationsList = (): JSX.Element => {
  const conversations = useXmtpStore((state) => state.conversations);
  const previewMessages = useXmtpStore((state) => state.previewMessages);

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

  if (!conversations || conversations.size == 0) {
    return <NoConversationsMessage />;
  }

  return (
    <>
      {conversations &&
        conversations.size > 0 &&
        Array.from(conversations.values())
          .sort(orderByLatestMessage)
          .map((convo) => {
            return (
              <ConversationTile
                key={getConversationId(convo)}
                conversation={convo}
              />
            );
          })}
    </>
  );
};

const NoConversationsMessage = (): JSX.Element => {
  return (
    <div className="flex flex-col flex-grow justify-center h-[100%]">
      <div className="flex flex-col items-center px-4 text-center">
        <ChatIcon
          className="h-8 w-8 mb-1 stroke-n-200 md:stroke-n-300"
          aria-hidden="true"
          data-testid="empty-message-icon"
        />
        <p
          className="text-xl md:text-lg text-n-200 md:text-n-300 font-bold"
          data-testid="empty-message-header">
          Your message list is empty
        </p>
        <p
          className="text-lx md:text-md text-n-200 font-normal"
          data-testid="empty-message-subheader">
          There are no messages for this address
        </p>
      </div>
    </div>
  );
};

export default React.memo(ConversationsList);
