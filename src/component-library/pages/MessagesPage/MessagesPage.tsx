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
import { shortAddress } from "../../../../src/helpers";
import { Avatar } from "../../components/Avatar/Avatar";
import { FullMessage } from "../../components/FullMessage/FullMessage";
import InfiniteScroll from "react-infinite-scroll-component";

interface MessagesPageProps {
  // This exact page is really not intended to be used for anything except storybook, since it shows the different views.
  // Instead of type, the views rendered should show based on state.
  type?: string;
}

const fromProps = {
  text: <span>This should be a from message</span>,
  from: {
    displayAddress: "hi.xmtp.eth",
    isSelf: true,
  },
  datetime: new Date(),
};

const toProps = {
  text: <span>This should be a to message.</span>,
  from: {
    displayAddress: "otherperson.xmtp.eth",
    isSelf: false,
  },
  datetime: new Date(),
};

export const MessagesPage = ({ type }: MessagesPageProps) => {
  const alternatingMessage = (
    <div>
      <FullMessage {...fromProps} showDateDivider />
      <FullMessage {...toProps} />
    </div>
  );

  if (type === "empty") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <ConversationList />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <LearnMore version="7" setStartedFirstMessage={() => {}} />
        </div>
      </div>
    );
  }
  if (type === "compose_new") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
            <ConversationList messages={[<MessagePreviewCard key={0} />]} />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput />
          <FullConversation messages={[]} />
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
          />
        </div>
      </div>
    );
  }
  if (type === "finding_ens_no_messages") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
            <ConversationList messages={[<MessagePreviewCard key={0} />]} />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput subtext="Finding ENS..." />
          <FullConversation messages={[]} />
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
          />
        </div>
      </div>
    );
  }
  if (type === "resolved_ens_no_messages") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
            <ConversationList
              messages={[
                <MessagePreviewCard key={0} displayAddress="hi.xmtp.eth" />,
              ]}
            />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
          />
        </div>
      </div>
    );
  }

  if (type === "finding_ens_with_messages") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
            <ConversationList
              messages={[
                <MessagePreviewCard key={"preview"} />,
                Array(20).fill(
                  <MessagePreviewCard
                    text="Here's an existing message"
                    displayAddress="theseWillAllBeTheSame.xmtp.eth"
                    datetime={new Date()}
                  />,
                ),
              ]}
            />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput subtext="Finding ENS..." />
          <FullConversation />
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
          />
        </div>
      </div>
    );
  }

  if (type === "resolved_ens_with_messages") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
            <ConversationList
              messages={[
                <MessagePreviewCard
                  displayAddress="hi.xmtp.eth"
                  key="preview"
                />,
                ...Array(20).fill(
                  <MessagePreviewCard
                    text="Here's an existing message"
                    displayAddress="theseWillAllBeTheSame.xmtp.eth"
                    datetime={new Date()}
                  />,
                ),
              ]}
            />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
            }}
          />
          <FullConversation />
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
          />
        </div>
      </div>
    );
  }

  if (type === "left_nav") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav displayAddress="hi.xmtp.eth" />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
            <ConversationList
              messages={[
                <MessagePreviewCard key={0} displayAddress="hi.xmtp.eth" />,
              ]}
            />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
          />
        </div>
      </div>
    );
  }

  if (type === "short_history") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
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
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
            }}
          />
          <div
            id="scrollableDiv"
            tabIndex={0}
            className="h-screen md:h-full w-full flex flex-col flex-col-reverse overflow-y-auto">
            <InfiniteScroll
              className="flex flex-col flex-col-reverse"
              dataLength={40}
              next={() => {}}
              endMessage={!40}
              hasMore={false}
              loader={false}>
              <FullConversation messages={Array(2).fill(alternatingMessage)} />
            </InfiniteScroll>
          </div>
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
          />
        </div>
      </div>
    );
  }

  if (type === "long_history") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
            <ConversationList
              messages={Array(20).fill(
                <MessagePreviewCard
                  text="Here's an existing message"
                  displayAddress="theseWillAllBeTheSame.xmtp.eth"
                  datetime={new Date()}
                />,
              )}
            />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
            }}
          />
          <div
            id="scrollableDiv"
            tabIndex={0}
            className="h-screen md:h-full w-full flex flex-col flex-col-reverse overflow-y-auto">
            <InfiniteScroll
              className="flex flex-col flex-col-reverse"
              dataLength={20}
              next={() => {}}
              endMessage={!20}
              hasMore={false}
              loader={false}>
              <FullConversation messages={Array(20).fill(alternatingMessage)} />
            </InfiniteScroll>
          </div>
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
          />
        </div>
      </div>
    );
  }

  if (type === "convo_loading") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
            <ConversationList
              messages={Array(20).fill(
                <MessagePreviewCard
                  text="Here's an existing message"
                  displayAddress="theseWillAllBeTheSame.xmtp.eth"
                  datetime={new Date()}
                />,
              )}
            />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
            }}
          />
          <div
            id="scrollableDiv"
            tabIndex={0}
            className="h-screen md:h-full w-full flex flex-col flex-col-reverse overflow-y-auto">
            <InfiniteScroll
              className="flex flex-col flex-col-reverse"
              dataLength={20}
              next={() => {}}
              endMessage={!20}
              hasMore={false}
              loader={false}>
              <FullConversation isLoading={true} />
            </InfiniteScroll>
          </div>
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
            isDisabled
          />
        </div>
      </div>
    );
  }

  if (type === "page_loading") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <ConversationList isLoading />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <div
            id="scrollableDiv"
            tabIndex={0}
            className="h-screen md:h-full w-full flex flex-col flex-col-reverse overflow-y-auto">
            <InfiniteScroll
              className="flex flex-col flex-col-reverse"
              dataLength={20}
              next={() => {}}
              endMessage={!20}
              hasMore={false}
              loader={false}>
              <FullConversation isLoading={true} />
            </InfiniteScroll>
          </div>
        </div>
      </div>
    );
  }

  if (type === "profile_dropdown") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <ProfileDropdown isOpen addressCards={[]} />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
            <ConversationList
              messages={Array(20).fill(
                <MessagePreviewCard
                  text="Here's an existing message"
                  displayAddress="theseWillAllBeTheSame.xmtp.eth"
                  datetime={new Date()}
                />,
              )}
            />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
            }}
          />
          <FullConversation messages={[]} />
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
          />
        </div>
      </div>
    );
  }

  if (type === "expanded_tooltip") {
    return (
      <div className="bg-white w-full h-screen flex flex-col md:flex-row">
        <div className="flex md:w-1/3 md:min-w-fit h-screen md:h-full">
          <SideNav />
          <div className="flex flex-col h-screen md:h-full w-full overflow-auto">
            <HeaderDropdown />
            <ConversationList
              messages={Array(20).fill(
                <MessagePreviewCard
                  text="Here's an existing message"
                  displayAddress="theseWillAllBeTheSame.xmtp.eth"
                  datetime={new Date()}
                />,
              )}
            />
          </div>
        </div>
        <div className="flex w-full overflow-visible md:overflow-hidden flex-col h-screen md:h-full ">
          <AddressInput
            resolvedAddress={{
              displayAddress: "hi.xmtp.eth",
              walletAddress: "0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0",
            }}
          />
          <ExpandedWalletCard
            isOpen
            avatar={<Avatar />}
            currentAddress="hi.xmtp.eth"
            addresses={[
              shortAddress("0x194c31cAe1418D5256E8c58e0d08Aee1046C6Ed0"),
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
          <MessageInput
            setAttachment={() => {}}
            setAttachmentPreview={() => {}}
            setIsDragActive={() => {}}
          />
        </div>
      </div>
    );
  }

  return null;
};
