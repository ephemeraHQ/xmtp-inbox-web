import React from "react";
import SideNav from "../../components/SideNav/SideNav";
import { ConversationList } from "../../components/ConversationList/ConversationList";
import { AddressInput } from "../../components/AddressInput/AddressInput";
import { FullConversation } from "../../components/FullConversation/FullConversation";
import { MessageInput } from "../../components/MessageInput/MessageInput";
import { LearnMore } from "../../components/LearnMore/LearnMore";
import { MessagePreviewCard } from "../../components/MessagePreviewCard/MessagePreviewCard";
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
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/2">
          <SideNav />
          <ConversationList />
        </div>
        <div className="flex flex-col w-full h-full">
          <LearnMore />
        </div>
      </div>
    );
  }
  if (type === "compose_new") {
    return (
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/2">
          <SideNav />
          <div className="w-full flex flex-col h-screen overflow-scroll">
            <HeaderDropdown isOpen={false} />
            <ConversationList messages={[<MessagePreviewCard key={0} />]} />
          </div>
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput />
          <FullConversation messages={[]} />
          <MessageInput />
        </div>
      </div>
    );
  }
  if (type === "finding_ens_no_messages") {
    return (
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/2">
          <SideNav />
          <div className="w-full flex flex-col h-screen overflow-scroll">
            <HeaderDropdown isOpen={false} />
            <ConversationList messages={[<MessagePreviewCard key={0} />]} />
          </div>
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput subtext="Finding ENS..." />
          <FullConversation messages={[]} />
          <MessageInput />
        </div>
      </div>
    );
  }
  if (type === "resolved_ens_no_messages") {
    return (
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/2">
          <SideNav />
          <div className="w-full flex flex-col h-screen overflow-scroll">
            <HeaderDropdown isOpen={false} />
            <ConversationList messages={[<MessagePreviewCard key={0} />]} />
          </div>
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput />
        </div>
      </div>
    );
  }

  if (type === "finding_ens_with_messages") {
    return (
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="h-screen flex md:w-1/2 md:min-w-fit overflow-y-scroll">
          <SideNav />
          <div className="w-full flex flex-col h-screen overflow-scroll">
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
        </div>
        <div className="h-screen flex flex-col w-full">
          <AddressInput subtext="Finding ENS..." />
          <FullConversation />
          <MessageInput />
        </div>
      </div>
    );
  }

  if (type === "resolved_ens_with_messages") {
    return (
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/2 md:min-w-fit overflow-y-scroll">
          <SideNav />
          <div className="w-full flex flex-col h-screen overflow-scroll">
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
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation />
          <MessageInput />
        </div>
      </div>
    );
  }

  if (type === "expanded_left_nav") {
    return (
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/2 md:min-w-fit overflow-y-scroll">
          <SideNav
            isOpen
            displayAddress="hi.xmtp.eth"
            walletAddress={shortAddress(
              "0x0123456789x0123456789x0123456789x0123456789",
            )}
          />
          <div className="w-full flex flex-col h-screen overflow-scroll">
            <HeaderDropdown isOpen={false} />
            <ConversationList messages={[<MessagePreviewCard key={0} />]} />
          </div>
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput />
        </div>
      </div>
    );
  }

  if (type === "short_history") {
    return (
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/2 md:min-w-fit overflow-y-scroll">
          <SideNav />
          <div className="w-full flex flex-col h-screen overflow-scroll">
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
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation isLoading={true} convoStartDate={new Date()} />
          <MessageInput />
        </div>
      </div>
    );
  }

  if (type === "long_history") {
    return (
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/2 md:min-w-fit overflow-y-scroll">
          <SideNav />
          <div className="w-full flex flex-col h-screen overflow-scroll">
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
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation isLoading={true} convoStartDate={new Date()} />
          <MessageInput />
        </div>
      </div>
    );
  }

  if (type === "convo_loading") {
    return (
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/2 md:min-w-fit overflow-y-scroll">
          <SideNav />
          <div className="w-full flex flex-col h-screen overflow-scroll">
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
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation isLoading />
          <MessageInput isDisabled />
        </div>
      </div>
    );
  }

  if (type === "page_loading") {
    return (
      <div className="w-screen md:h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/2 md:min-w-fit overflow-y-scroll">
          <SideNav />
          <ConversationList isLoading />
        </div>
        <div className="hidden md:flex flex-col w-full h-screen">
          <FullConversation isLoading />
        </div>
      </div>
    );
  }

  if (type === "profile_dropdown") {
    return (
      <div className="flex w-screen md:h-screen flex-col md:flex-row">
        <div className="min-w-fit flex overflow-y-scroll">
          <SideNav />
          <ProfileDropdown isOpen addressCards={[]} />
          <div className="flex flex-col h-screen overflow-scroll">
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
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput />
        </div>
      </div>
    );
  }

  if (type === "header_dropdown") {
    return (
      <div className="flex w-screen md:h-screen flex-col md:flex-row">
        <div className="min-w-fit flex overflow-y-scroll">
          <SideNav />
          <div className="flex flex-col h-screen overflow-scroll">
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
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "01234",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput />
        </div>
      </div>
    );
  }

  if (type === "expanded_tooltip") {
    return (
      <div className="flex w-screen md:h-screen flex-col md:flex-row">
        <div className="min-w-fit flex overflow-y-scroll">
          <SideNav />
          <div className="flex flex-col h-screen overflow-scroll">
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
        </div>
        <div className="flex flex-col w-full h-screen">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "01234",
            }}
          />
          <ExpandedWalletCard
            isOpen
            avatar={<Avatar />}
            currentAddress="hi.xmtp.eth"
            addresses={[
              shortAddress("0x0123456789012345678901234567890123456789"),
              "hi.xmtp.eth",
              "hi.xmtp.lens",
            ]}
            collectibles={[
              <Avatar key={1} />,
              <Avatar key={2} />,
              <Avatar key={3} />,
              <Avatar key={3} />,
            ]}
          />
          <FullConversation messages={[]} />
          <MessageInput />
        </div>
      </div>
    );
  }

  return null;
};
