import { useAccount, useEnsAvatar, useEnsName } from "wagmi";
import { fetchEnsAddress } from "@wagmi/core";
import React, { useCallback, useEffect, useState } from "react";
import useListConversations from "../hooks/useListConversations";
import { useXmtpStore } from "../store/xmtp";
import { AddressInput } from "../component-library/components/AddressInput/AddressInput";
import useWalletAddress from "../hooks/useWalletAddress";
import {
  getConversationId,
  getRecipientInputSubtext,
  isEnsAddress,
  isValidLongWalletAddress,
  RecipientInputMode,
} from "../helpers";
import SideNav from "../component-library/components/SideNav/SideNav";
import { HeaderDropdown } from "../component-library/components/HeaderDropdown/HeaderDropdown";
import { FullConversation } from "../component-library/components/FullConversation/FullConversation";
import { MessageInput } from "../component-library/components/MessageInput/MessageInput";
import { ConversationList } from "../component-library/components/ConversationList/ConversationList";
import useSendMessage from "../hooks/useSendMessage";
import { FullMessage } from "../component-library/components/FullMessage/FullMessage";
import { MessagePreviewCard } from "../component-library/components/MessagePreviewCard/MessagePreviewCard";
import { Conversation } from "@xmtp/xmtp-js";
import InfiniteScroll from "react-infinite-scroll-component";
import useGetMessages from "../hooks/useGetMessages";

type address = "0x${string}";

// Export to helper
const hasMessages = (messages: []) => Number(messages?.length ?? 0) > 0;

const isOnSameDay = (d1?: Date, d2?: Date): boolean => {
  return d1?.toDateString() === d2?.toDateString();
};

const Inbox: React.FC<{ children?: React.ReactNode }> = () => {
  // XMTP Store
  const client = useXmtpStore((state) => state.client);
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const conversations = useXmtpStore((state) => state.conversations);
  const setConversations = useXmtpStore((state) => state.setConversations);
  const storeConversationId =
    useXmtpStore((state) => state.conversationId) || "";
  const setConversationId = useXmtpStore((state) => state.setConversationId);
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const previewMessages = useXmtpStore((state) => state.previewMessages);
  const loadingConversations = useXmtpStore(
    (state) => state.loadingConversations,
  );

  // Local State
  const [isOpenSideNav, setIsOpenSideNav] = useState(false);
  const [showMessageView, setShowMessageView] = useState<boolean>(true);
  const [convo, setConvo] = useState();
  const [recipientEnteredValue, setRecipientEnteredValue] =
    useState<string>("");
  const [lastMessageDate, setLastMessageDate] = useState();
  const [endTime, setEndTime] = useState<Map<string, Date>>(new Map());

  // Wagmi Hooks
  const { data, isLoading: isAvatarUrlLoading } = useEnsAvatar({
    address: recipientWalletAddress as address,
  });
  const { address: walletAddress } = useAccount();
  const { data: ensNameConnectedWallet } = useEnsName({
    address: walletAddress,
  });
  // const { isLoading: isLoadingEns } = useEnsName({
  //   address: convo?.peerAddress as address,
  // });
  // const { data: avatarData, isLoading: isLoadingAvatar } = useEnsAvatar({
  //   address: convo?.peerAddress as address,
  // });

  // Current conversation by conversation ID
  // Since conversationId can be set to an ENS name, we reset it below for those cases to pull from the ENS address
  // Resolves bug where entering an existing conversation with ENS name in "new message" doesn't retrieve conversations
  const { ensAddress } = useWalletAddress();
  const conversationId = isEnsAddress(storeConversationId)
    ? ensAddress
    : storeConversationId;
  const selectedConversation = conversations.get(conversationId as string);

  const [recipientInputMode, setRecipientInputMode] = useState(
    RecipientInputMode.InvalidEntry,
  );

  // XMTP Hooks
  useListConversations();
  // ENS Address from same hook required for conversation ID check above
  const { isValid, ensName } = useWalletAddress();

  const { sendMessage } = useSendMessage(selectedConversation);

  const { convoMessages: messages, hasMore } = useGetMessages(
    conversationId as string,
    endTime.get(conversationId as string),
  );

  // Lifecycle methods
  useEffect(() => {
    const setLookupValue = async () => {
      if (isValidLongWalletAddress(recipientWalletAddress)) {
        const conversation =
          conversationId && conversationId !== recipientWalletAddress
            ? await client?.conversations?.newConversation(
                recipientWalletAddress,
                {
                  conversationId,
                  metadata: {},
                },
              )
            : await client?.conversations?.newConversation(
                recipientWalletAddress,
              );
        if (conversation) {
          conversations.set(getConversationId(conversation), conversation);
          setConversations(new Map(conversations));
        }
      }
    };
    if (
      recipientWalletAddress &&
      recipientInputMode !== RecipientInputMode.OnNetwork
    ) {
      setRecipientInputMode(RecipientInputMode.OnNetwork);
    }
    if (recipientInputMode === RecipientInputMode.OnNetwork) {
      setLookupValue();
    }
  }, [recipientInputMode, recipientWalletAddress, conversationId]);

  useEffect(() => {
    const handleSubmit = async () => {
      if (recipientEnteredValue) {
        if (isEnsAddress(recipientEnteredValue)) {
          setRecipientInputMode &&
            setRecipientInputMode(RecipientInputMode.FindingEntry);
          const address = await fetchEnsAddress({
            name: recipientEnteredValue,
          });
          if (address) {
            checkIfOnNetwork(address);
          } else {
            setRecipientInputMode &&
              setRecipientInputMode(RecipientInputMode.InvalidEntry);
          }
        } else if (isValidLongWalletAddress(recipientEnteredValue)) {
          checkIfOnNetwork(recipientEnteredValue as address);
        } else {
          setRecipientInputMode &&
            setRecipientInputMode(RecipientInputMode.InvalidEntry);
        }
      }
    };
    if (recipientInputMode !== RecipientInputMode.OnNetwork) {
      handleSubmit();
    }
  }, [recipientEnteredValue]);

  // Click events
  const onNewMessageClick = () => {
    setRecipientWalletAddress("");
    setConversationId();
    setShowMessageView(true);
  };

  const onSideNavBtnClick = (key: string) => {
    if (key === "Collapse") setIsOpenSideNav(!isOpenSideNav);
  };

  const onConvoClick = (conversation: Conversation) => {
    if (recipientWalletAddress !== conversation.peerAddress) {
      setRecipientWalletAddress(conversation.peerAddress);
    }
    if (conversationId !== getConversationId(conversation)) {
      setConversationId(getConversationId(conversation));
    }
  };

  // Helpers (export)
  const checkIfOnNetwork = async (address: string) => {
    let canMessage;
    if (client) {
      try {
        canMessage = await client.canMessage(address);
        if (!canMessage) {
          setRecipientInputMode(RecipientInputMode.NotOnNetwork);
        } else {
          setRecipientInputMode(RecipientInputMode.OnNetwork);
          setRecipientWalletAddress(address);
          setConversationId(address);
        }
      } catch (e) {
        setRecipientInputMode(RecipientInputMode.NotOnNetwork);
      }
    }
  };

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

  // Callbacks
  const fetchNextMessages = useCallback(() => {
    if (
      hasMore &&
      Array.isArray(messages) &&
      messages.length > 0 &&
      conversationId
    ) {
      const lastMsgDate = messages[messages.length - 1].sent;
      const currentEndTime = endTime.get(conversationId);
      if (!currentEndTime || lastMsgDate <= currentEndTime) {
        endTime.set(conversationId, lastMsgDate);
        setEndTime(new Map(endTime));
      }
    }
  }, [conversationId, hasMore, messages, endTime]);

  return (
    <div className="bg-white w-screen md:h-screen flex flex-col md:flex-row">
      <div className="flex md:w-1/2 md:min-w-fit overflow-y-scroll">
        <SideNav
          onClick={onSideNavBtnClick}
          isOpen={isOpenSideNav}
          displayAddress={ensNameConnectedWallet ?? walletAddress}
          walletAddress={ensNameConnectedWallet ? walletAddress : undefined}
        />
        <div className="w-full flex flex-col h-screen overflow-scroll">
          <HeaderDropdown isOpen={false} onClick={onNewMessageClick} disabled />
          <ConversationList
            isLoading={loadingConversations}
            messages={Array.from(conversations.values())
              .sort(orderByLatestMessage)
              .map((convo) => {
                // setConvo(convo);
                const previewMessage = previewMessages.get(
                  getConversationId(convo),
                );
                const isSelected = conversationId === getConversationId(convo);
                return (
                  previewMessage?.id && (
                    <MessagePreviewCard
                      isSelected={isSelected}
                      key={previewMessage?.id}
                      text={previewMessage?.content}
                      datetime={previewMessage?.sent}
                      displayAddress={convo?.peerAddress}
                      onClick={() => onConvoClick?.(convo)}
                      // avatarUrl={avatarData || ""}
                      // isLoading={isLoadingAvatar || isLoadingEns}
                    />
                  )
                );
              })}
          />
        </div>
      </div>
      <div className="flex flex-col w-full h-screen">
        <AddressInput
          isError={!isValid}
          subtext={getRecipientInputSubtext(recipientInputMode)}
          resolvedAddress={{
            displayAddress: ensName ?? recipientWalletAddress,
            walletAddress: ensName ? recipientWalletAddress : "",
          }}
          avatarUrlProps={{
            avatarUrl: data ?? "",
            isLoading: isAvatarUrlLoading,
            address: recipientWalletAddress,
          }}
          onChange={setRecipientEnteredValue}
          isLoading={RecipientInputMode.FindingEntry === recipientInputMode}
          value={recipientEnteredValue}
        />
        <InfiniteScroll
          dataLength={messages?.length || 0}
          next={fetchNextMessages}
          className="flex flex-col-reverse overflow-y-auto pl-4"
          height={"81vh"}
          inverse
          endMessage={!messages?.length}
          hasMore={hasMore}
          loader={false}>
          <FullConversation
            isLoading={loadingConversations}
            messages={messages?.map((msg, index) => {
              const dateHasChanged = lastMessageDate
                ? !isOnSameDay(lastMessageDate, msg.sent)
                : false;
              const messageDiv = (
                <div key={`${msg.id}_${index}`}>
                  <FullMessage
                    text={msg.content}
                    key={`${msg.id}_${index}`}
                    from={{
                      displayAddress: msg.senderAddress,
                      isSelf: walletAddress === msg.senderAddress,
                    }}
                    datetime={msg.sent}
                  />
                  {/* {dateHasChanged ? (
                    <DateDivider date={lastMessageDate} />
                  ) : null} */}
                </div>
              );
              if (lastMessageDate !== msg.sent) {
                setLastMessageDate(msg.sent);
              }
              return messageDiv;
            })}
          />
        </InfiniteScroll>
        <MessageInput
          isDisabled={recipientInputMode !== RecipientInputMode.OnNetwork}
          onSubmit={sendMessage}
        />
      </div>
    </div>
  );
};

export default Inbox;
