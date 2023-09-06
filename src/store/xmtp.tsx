import { create } from "zustand";
import { RecipientInputMode } from "../helpers";
import type { address } from "../pages/inbox";

interface XmtpState {
  loadingConversations: boolean;
  setLoadingConversations: (loadingConversations: boolean) => void;
  recipientWalletAddress: string | address;
  setRecipientWalletAddress: (address: string) => void;
  conversationTopic?: string;
  setConversationTopic: (conversationTopic?: string) => void;
  recipientInputMode: number;
  setRecipientInputMode: (recipientInputMode?: number) => void;
  recipientEnteredValue: string;
  setRecipientEnteredValue: (recipientEnteredValue?: string) => void;
  resetXmtpState: () => void;
  startedFirstMessage: boolean;
  setStartedFirstMessage: (startedFirstMessage: boolean) => void;
  attachmentError: string;
  setAttachmentError: (attachmentError: string) => void;
}

export const useXmtpStore = create<XmtpState>((set) => ({
  loadingConversations: true,
  setLoadingConversations: (loadingConversations: boolean) =>
    set(() => ({ loadingConversations })),
  recipientWalletAddress: "",
  setRecipientWalletAddress: (address) =>
    set(() => ({ recipientWalletAddress: address })),
  conversationTopic: "",
  setConversationTopic: (conversationTopic) =>
    set(() => ({ conversationTopic })),
  recipientInputMode: RecipientInputMode.InvalidEntry,
  setRecipientInputMode: (recipientInputMode) =>
    set(() => ({ recipientInputMode })),
  recipientEnteredValue: "",
  setRecipientEnteredValue: (recipientEnteredValue) =>
    set(() => ({ recipientEnteredValue })),
  resetXmtpState: () =>
    set(() => ({
      client: undefined,
      recipientWalletAddress: "",
      conversationTopic: undefined,
      startedFirstMessage: false,
      recipientInputMode: RecipientInputMode.InvalidEntry,
    })),
  startedFirstMessage: false,
  setStartedFirstMessage: (startedFirstMessage) =>
    set(() => ({ startedFirstMessage })),
  attachmentError: "",
  setAttachmentError: (attachmentError) => set(() => ({ attachmentError })),
}));
