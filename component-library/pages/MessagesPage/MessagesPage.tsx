import React from "react";
import SideNav from "../../components/SideNav/SideNav";
import { ConversationList } from "../../components/ConversationList/ConversationList";
import { AddressInput } from "../../components/AddressInput/AddressInput";
import { FullConversation } from "../../components/FullConversation/FullConversation";
import { MessageInput } from "../../components/MessageInput/MessageInput";
import { LearnMore } from "../../components/LearnMore/LearnMore";
import { MessagePreviewCard } from "../../components/MessagePreviewCard/MessagePreviewCard";
import { alternatingMessage } from "../../components/FullConversation/FullConversation.stories";
import { ProfileDropdown } from "../../components/ProfileDropdown/ProfileDropdown";
import { HeaderDropdown } from "../../components/HeaderDropdown/HeaderDropdown";
import { ExpandedWalletCard } from "../../components/ExpandedWalletCard/ExpandedWalletCard";
import { shortAddress } from "../../../helpers";
import { Avatar } from "../../components/Avatar/Avatar";

interface MessagesPageProps {
  // This exact page is really not intended to be used for anything except storybook, since it shows the different views.
  // Instead of type, the views rendered should show based on state.
  /**
   * What, if any, subtext is there?
   */
  type?: string;
}

export const MessagesPage = ({ type }: MessagesPageProps) => {
  if (type === "empty") {
    return (
      <div className="flex w-screen">
        <SideNav />
        <div className="w-1/3 h-screen">
          <ConversationList />
        </div>
        <div className="flex flex-col w-full h-screen">
          <LearnMore />
        </div>
      </div>
    );
  }
  if (type === "compose_new") {
    return (
      <div className="flex w-screen">
        <SideNav />
        <div className="w-1/3 h-screen">
          <ConversationList messages={[<MessagePreviewCard key={0} />]} />
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput />
          <FullConversation messages={[]} />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }
  if (type === "finding_ens_no_messages") {
    return (
      <div className="flex w-screen">
        <SideNav />
        <div className="w-1/3 h-screen">
          <ConversationList messages={[<MessagePreviewCard key={0} />]} />
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput subtext="Finding ENS..." />
          <FullConversation messages={[]} />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }
  if (type === "resolved_ens_no_messages") {
    return (
      <div className="flex w-screen">
        <SideNav />
        <div className="w-1/3 h-screen">
          <ConversationList messages={[<MessagePreviewCard key={0} />]} />
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "montez.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }

  if (type === "finding_ens_with_messages") {
    return (
      <div className="flex w-screen">
        <SideNav />
        <div className="flex flex-col h-screen w-1/3 overflow-scroll">
          <ConversationList
            messages={Array(20).fill(
              <MessagePreviewCard
                text="Here's an existing message"
                displayAddress="theseWillAllBeTheSame.eth"
                datetime={new Date()}
              />,
            )}
          />
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput subtext="Finding ENS..." />
          <FullConversation />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }

  if (type === "profile_dropdown") {
    return (
      <div className="flex w-screen">
        <SideNav />
        <ProfileDropdown isOpen addressCards={[]} />
        <div className="flex flex-col h-screen w-1/3 overflow-scroll">
          <HeaderDropdown isOpen={false} />
          <ConversationList
            messages={Array(20).fill(
              <MessagePreviewCard
                text="Here's an existing message"
                displayAddress="theseWillAllBeTheSame.eth"
                datetime={new Date()}
              />,
            )}
          />
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "montez.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }

  if (type === "header_dropdown") {
    return (
      <div className="flex w-screen">
        <SideNav />
        <div className="flex flex-col h-screen w-1/3 overflow-scroll">
          <HeaderDropdown isOpen />
          <ConversationList
            messages={Array(20).fill(
              <MessagePreviewCard
                text="Here's an existing message"
                displayAddress="theseWillAllBeTheSame.eth"
                datetime={new Date()}
              />,
            )}
          />
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "montez.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }

  if (type === "expanded_tooltip") {
    return (
      <div className="flex w-screen">
        <SideNav />
        <div className="flex flex-col h-screen w-1/3 overflow-scroll">
          <ConversationList
            messages={Array(20).fill(
              <MessagePreviewCard
                text="Here's an existing message"
                displayAddress="theseWillAllBeTheSame.eth"
                datetime={new Date()}
              />,
            )}
          />
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "montez.eth",
              walletAddress: "01234",
            }}
          />
          <ExpandedWalletCard
            isOpen
            avatar={<Avatar />}
            currentAddress="darick.eth"
            addresses={[
              shortAddress("0x0123456789012345678901234567890123456789"),
              "darick.eth",
              "darick.lens",
            ]}
            collectibles={[
              <Avatar key={1} />,
              <Avatar key={2} />,
              <Avatar key={3} />,
              <Avatar key={3} />,
            ]}
          />
          <FullConversation messages={[]} />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }

  if (type === "profile") {
    return (
      <div className="flex w-screen">
        <SideNav />
        <div className="flex flex-col h-screen w-1/3 overflow-scroll">
          <ConversationList
            messages={Array(20).fill(
              <MessagePreviewCard
                text="Here's an existing message"
                displayAddress="theseWillAllBeTheSame.eth"
                datetime={new Date()}
              />,
            )}
          />
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "montez.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }

  if (type === "expanded_left_nav") {
    return (
      <div className="flex w-screen">
        <SideNav isOpen />
        <ConversationList messages={[<MessagePreviewCard key={0} />]} />
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "montez.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }

  if (type === "short_history") {
    return (
      <div className="flex w-screen h-screen">
        <SideNav />
        <div className="flex flex-col h-screen w-1/3 overflow-scroll">
          <ConversationList
            messages={Array(20).fill(
              <MessagePreviewCard
                text="Here's an existing message"
                displayAddress="theseWillAllBeTheSame.eth"
                datetime={new Date()}
              />,
            )}
          />
        </div>
        <div className="flex flex-col w-full overflow-scroll">
          <AddressInput
            resolvedAddress={{
              displayAddress: "montez.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation
            messages={Array(2).fill(alternatingMessage)}
            convoStartDate={new Date()}
          />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }

  if (type === "long_history") {
    return (
      <div className="flex w-screen h-screen">
        <SideNav />
        <div className="flex flex-col h-screen w-1/3 overflow-scroll">
          <ConversationList
            messages={Array(20).fill(
              <MessagePreviewCard
                text="Here's an existing message"
                displayAddress="theseWillAllBeTheSame.eth"
                datetime={new Date()}
              />,
            )}
          />
        </div>
        <div className="flex flex-col w-full">
          <AddressInput
            resolvedAddress={{
              displayAddress: "montez.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation
            messages={Array(20).fill(alternatingMessage)}
            convoStartDate={new Date()}
          />
          <MessageInput onSubmit={() => {}} />
        </div>
      </div>
    );
  }

  if (type === "convo_loading") {
    return (
      <div className="flex w-screen h-screen">
        <SideNav />
        <div className="flex flex-col h-screen w-1/3 overflow-scroll">
          <ConversationList
            messages={Array(20).fill(
              <MessagePreviewCard
                text="Here's an existing message"
                displayAddress="theseWillAllBeTheSame.eth"
                datetime={new Date()}
              />,
            )}
          />
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "montez.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation isLoading />
          <MessageInput onSubmit={() => {}} isDisabled />
        </div>
      </div>
    );
  }

  if (type === "page_loading") {
    return (
      <div className="flex w-screen h-screen">
        <SideNav />
        <div className="flex flex-col h-screen w-1/3 overflow-hidden">
          <ConversationList isLoading />,
        </div>
        <div className="flex flex-col w-2/3 h-full">
          <FullConversation isLoading />
        </div>
      </div>
    );
  }

  return null;
};
