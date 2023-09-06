import type { Attachment } from "@xmtp/content-type-remote-attachment";
import { useStartConversation } from "@xmtp/react-sdk";
import { MessageInput } from "../component-library/components/MessageInput/MessageInput";
import { RecipientInputMode } from "../helpers";
import useGetRecipientInputMode from "../hooks/useGetRecipientInputMode";
import useSendMessage from "../hooks/useSendMessage";
import useSelectedConversation from "../hooks/useSelectedConversation";

interface MessageInputControllerProps {
  attachment?: Attachment;
  attachmentPreview?: string;
  setAttachment: (attachment: Attachment | undefined) => void;
  setAttachmentPreview: (url: string | undefined) => void;
  setIsDragActive: (status: boolean) => void;
}

export const MessageInputController = ({
  attachment,
  setAttachment,
  attachmentPreview,
  setAttachmentPreview,
  setIsDragActive,
}: MessageInputControllerProps) => {
  // XMTP Hooks
  const { recipientInputMode, recipientEnteredValue } =
    useGetRecipientInputMode();
  const conversation = useSelectedConversation();
  const { startConversation } = useStartConversation();
  const { sendMessage } = useSendMessage(attachment || undefined);

  return (
    <MessageInput
      peerAddress={recipientEnteredValue}
      isDisabled={recipientInputMode !== RecipientInputMode.OnNetwork}
      startConversation={startConversation}
      sendMessage={sendMessage}
      conversation={conversation}
      attachment={attachment}
      setAttachment={setAttachment}
      attachmentPreview={attachmentPreview}
      setAttachmentPreview={setAttachmentPreview}
      setIsDragActive={setIsDragActive}
    />
  );
};
