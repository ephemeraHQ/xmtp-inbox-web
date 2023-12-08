import { useTranslation } from "react-i18next";
import type { VirtuosoHandle } from "react-virtuoso";
import { Virtuoso } from "react-virtuoso";
import { useMemo, useRef } from "react";

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
    ];
  }, [isLoading, messages]);

  return (
    <Virtuoso
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
