import React, { useState } from 'react';
import type { Attachment } from "@xmtp/content-type-remote-attachment";
import { useStartConversation } from "@xmtp/react-sdk";
import { MessageInput } from "../component-library/components/MessageInput/MessageInput";
import useSendMessage from "../hooks/useSendMessage";
import useSelectedConversation from "../hooks/useSelectedConversation";
import { useXmtpStore } from "../store/xmtp";
import { generateResponse, changeTone } from '../services/aiService';

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
  const conversation = useSelectedConversation();

  const recipientOnNetwork = useXmtpStore((s) => s.recipientOnNetwork);
  const recipientAddress = useXmtpStore((s) => s.recipientAddress);
  const activeMessage = useXmtpStore((s) => s.activeMessage);

  const { startConversation } = useStartConversation();
  const { sendMessage } = useSendMessage(
    attachment || undefined,
    activeMessage,
  );

  const [isGenerating, setIsGenerating] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handlePrompt = async () => {
    console.log("Prompt button clicked");
    setIsGenerating(true);
    try {
      let prompt = inputValue.trim();
      if (!prompt) {
        prompt = "Generate a message for a chat conversation.";
      } else {
        prompt = `Based on the following input, generate a relevant message for the conversation: "${prompt}"`;
      }
      const response = await generateResponse(prompt);
      console.log("Generated response:", response);
      setInputValue(response);
    } catch (error) {
      console.error('Error generating prompt:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleToneChange = async (tone: string) => {
    console.log("Tone change requested:", tone);
    if (!inputValue) return;
    setIsGenerating(true);
    try {
      const newMessage = await changeTone(inputValue, tone);
      console.log("New message with changed tone:", newMessage);
      setInputValue(newMessage);
    } catch (error) {
      console.error('Error changing tone:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <MessageInput
      peerAddress={recipientAddress}
      isDisabled={!recipientOnNetwork}
      startConversation={startConversation}
      sendMessage={sendMessage}
      conversation={conversation}
      attachment={attachment}
      setAttachment={setAttachment}
      attachmentPreview={attachmentPreview}
      setAttachmentPreview={setAttachmentPreview}
      setIsDragActive={setIsDragActive}
      isGenerating={isGenerating}
      handlePrompt={handlePrompt}
      handleToneChange={handleToneChange}
      value={inputValue}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInputValue(e.target.value)}
    />
  );
};
