import Link from "next/link";
import { useAccount, useConnect, useEnsAvatar } from "wagmi";
import { NavigationView, ConversationView } from "../components/Views";
import { fetchEnsAddress } from "@wagmi/core";
import NewMessageButton from "../components/NewMessageButton";
import NavigationPanel from "../components/NavigationPanel";
import XmtpInfoPanel from "../components/XmtpInfoPanel";
import UserMenu from "../components/UserMenu";
import React, { useEffect, useState } from "react";
import useListConversations from "../hooks/useListConversations";
import { useXmtpStore } from "../store/xmtp";
import useWindowSize from "../hooks/useWindowSize";
import { AddressInput } from "../component-library/components/AddressInput/AddressInput";
import useWalletAddress from "../hooks/useWalletAddress";
import {
  getConversationId,
  getRecipientInputSubtext,
  isEnsAddress,
  isValidLongWalletAddress,
  RecipientInputMode,
} from "../helpers";
import { address } from "../components/Address";
import { Conversation } from "../components/Conversation";
import SideNav from "../component-library/components/SideNav/SideNav";
import { HeaderDropdown } from "../component-library/components/HeaderDropdown/HeaderDropdown";

const Inbox: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const client = useXmtpStore((state) => state.client);

  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const { data, isLoading: isAvatarUrlLoading } = useEnsAvatar({
    address: recipientWalletAddress as address,
  });

  const { address: walletAddress } = useAccount();
  const [showMessageView, setShowMessageView] = useState(
    walletAddress && client,
  );
  const size = useWindowSize();

  useListConversations();

  const conversationId = useXmtpStore((state) => state.conversationId);
  const setConversationId = useXmtpStore((state) => state.setConversationId);
  const setRecipientWalletAddress = useXmtpStore(
    (state) => state.setRecipientWalletAddress,
  );
  const [recipientInputMode, setRecipientInputMode] = useState(
    RecipientInputMode.InvalidEntry,
  );
  const { isValid, ensName, ensAddress } = useWalletAddress();
  const conversations = useXmtpStore((state) => state.conversations);
  const setConversations = useXmtpStore((state) => state.setConversations);
  const [recipientEnteredValue, setRecipientEnteredValue] =
    useState<string>("");

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
    handleSubmit();
  }, [recipientEnteredValue]);

  const navigationView = () => {
    return (
      <NavigationView>
        <SideNav />
        <div className="flex flex-col flex-grow md:border-r md:border-gray-200 bg-white overflow-y-auto max-w-[300px]">
          <div className="max-h-16 min-h-[4rem] flex items-center justify-between flex-shrink-0">
            <HeaderDropdown isOpen={false} />
          </div>
          <NavigationPanel />
        </div>
      </NavigationView>
    );
  };

  const conversationView = () => {
    return (
      <ConversationView>
        {walletAddress && client ? (
          <>
            <div className="flex flex-col border-b border-gray-200 bg-white md:border-0 max-h-16 min-h-[4rem]">
              <AddressInput
                isError={!isValid}
                subtext={
                  RecipientInputMode.OnNetwork
                    ? ensName
                      ? ensAddress ?? recipientWalletAddress
                      : undefined
                    : getRecipientInputSubtext(recipientInputMode)
                }
                resolvedAddress={{
                  displayAddress: ensName ?? recipientWalletAddress,
                  walletAddress: !ensName ? recipientWalletAddress : "",
                }}
                avatarUrlProps={{
                  avatarUrl: data ?? "",
                  isLoading: isAvatarUrlLoading,
                  address: recipientWalletAddress,
                }}
                onChange={setRecipientEnteredValue}
                isLoading={
                  RecipientInputMode.FindingEntry === recipientInputMode
                }
                value={recipientEnteredValue}
              />
              {recipientInputMode === RecipientInputMode.OnNetwork && (
                <Conversation />
              )}
            </div>
          </>
        ) : (
          <XmtpInfoPanel />
        )}
      </ConversationView>
    );
  };

  return (
    <div>
      {size[0] > 600 ? (
        <div className="flex">
          {navigationView()}
          {conversationView()}
        </div>
      ) : showMessageView || recipientWalletAddress ? (
        <>{conversationView()}</>
      ) : (
        <>{navigationView()}</>
      )}
    </div>
  );
};

export default Inbox;
