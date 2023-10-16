import {
  getReplies,
  type CachedConversation,
  type CachedMessageWithId,
} from "@xmtp/react-sdk";
import { MessageInputController } from "../../../controllers/MessageInputController";
import { FullMessageController } from "../../../controllers/FullMessageController";
import { useXmtpStore } from "../../../store/xmtp";

export type ReplyThreadProps = {
  messages: CachedMessageWithId[];
  conversation: CachedConversation;
};

export const ReplyThread: React.FC<ReplyThreadProps> = ({
  messages,
  conversation,
}) => {
  const activeMessage = useXmtpStore((state) => state.activeMessage);
  // const replies = getReplies(activeMessage);

  // console.log("REPLIES", replies);

  return (
    <div className="flex flex-col">
      <h1>Reply section</h1>

      <MessageInputController
        setAttachment={() => {}}
        setAttachmentPreview={() => {}}
        setIsDragActive={() => {}}
        activeMessage={activeMessage}
      />
      {activeMessage ? (
        <FullMessageController
          key={activeMessage?.xmtpID}
          message={activeMessage}
          conversation={conversation}
        />
      ) : null}
      {/* {replies.map((msg) => (
        <FullMessageController
          key={msg.xmtpID}
          message={msg}
          conversation={conversation}
        />
      ))} */}
    </div>
  );
};
