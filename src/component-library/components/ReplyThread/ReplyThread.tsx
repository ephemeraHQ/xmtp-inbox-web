import { type CachedConversation, useReplies } from "@xmtp/react-sdk";
import { FullMessageController } from "../../../controllers/FullMessageController";
import { useXmtpStore } from "../../../store/xmtp";

export type ReplyThreadProps = {
  conversation: CachedConversation;
};

export const ReplyThread: React.FC<ReplyThreadProps> = ({ conversation }) => {
  const activeMessage = useXmtpStore((state) => state.activeMessage);
  const replies = useReplies(activeMessage);

  return (
    <div data-testid="replies-container" className="flex flex-col h-full">
      {activeMessage ? (
        <FullMessageController
          key={activeMessage?.xmtpID}
          message={activeMessage}
          conversation={conversation}
          isReply
        />
      ) : null}
      {replies.map((msg) => (
        <FullMessageController
          key={msg.xmtpID}
          message={msg}
          conversation={conversation}
          isReply
        />
      ))}
    </div>
  );
};
