import { useTranslation } from "react-i18next";
import type { VirtuosoHandle } from "react-virtuoso";
import { Virtuoso } from "react-virtuoso";
import { useMemo, useRef, useState } from "react";
import type { CachedConversationWithId } from "@xmtp/react-sdk";
import { useSendMessage as _useSendMessage } from "@xmtp/react-sdk";
import { ContentTypeCustom } from "../../../../customContent";
import useSelectedConversation from "../../../hooks/useSelectedConversation";

interface FullConversationProps {
  messages?: Array<JSX.Element | null>;
  isLoading?: boolean;
}

const LoadingMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex align-center justify-center text-gray-500 font-regular text-sm animate-pulse">
      {t("messages.conversation_loading")}
    </div>
  );
};

const BeginningMessage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div
      className="text-gray-500 font-regular text-sm w-full py-2 text-center"
      data-testid="message-beginning-text">
      {t("messages.conversation_start")}
    </div>
  );
};

export const FullConversation = ({
  messages = [],
  isLoading = false,
}: FullConversationProps) => {
  const { sendMessage: _sendMessage } = _useSendMessage();
  const conversation = useSelectedConversation();
  const [replacementMessage, setReplacementMessage] = useState("");

  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const filteredMessages = useMemo(() => {
    const filtered = messages.filter((msg) => msg !== null);
    return [
      isLoading ? (
        <LoadingMessage key="loading" />
      ) : (
        <BeginningMessage key="beginning" />
      ),
      ...filtered,
      replacementMessage && (
        <div
          className="bg-yellow-300 text-2xl font-bold text-center"
          key="replacement">
          {replacementMessage}
        </div>
      ),
    ];
  }, [isLoading, messages, replacementMessage]);

  return (
    <Virtuoso
      onClick={() => {
        void _sendMessage(
          conversation as CachedConversationWithId,
          { name: "Naomi & Daria's Fun Custom Content Type Goes Here" },
          ContentTypeCustom,
        ).then((res) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-argument
          void setReplacementMessage(res?.content.name);
        });
      }}
      alignToBottom
      data={filteredMessages}
      totalCount={filteredMessages.length}
      initialTopMostItemIndex={filteredMessages.length - 1}
      followOutput="auto"
      className="w-full h-full flex flex-col"
      itemContent={(index, message) => message}
      ref={virtuosoRef}
    />
  );
};
