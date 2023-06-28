import type { Conversation, DecodedMessage } from "@xmtp/react-sdk";
import { create } from "zustand";
import { RecipientInputMode } from "../helpers";
import getUniqueMessages from "../helpers/getUniqueMessages";
import type { address } from "../pages/inbox";

interface XmtpState {
  conversations: Map<string, Conversation>;
  setConversations: (conversations: Map<string, Conversation>) => void;
  loadingConversations: boolean;
  setLoadingConversations: (loadingConversations: boolean) => void;
  convoMessages: Map<string, DecodedMessage[]>;
  previewMessages: Map<string, DecodedMessage>;
  setPreviewMessage: (key: string, message: DecodedMessage) => void;
  setPreviewMessages: (previewMessages: Map<string, DecodedMessage>) => void;
  addMessages: (key: string, newMessages: DecodedMessage[]) => number;
  recipientWalletAddress: string | address;
  setRecipientWalletAddress: (address: string) => void;
  conversationId?: string;
  setConversationId: (conversationId?: string) => void;
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
  conversations: new Map(),
  setConversations: (conversations: Map<string, Conversation>) =>
    set(() => ({ conversations })),
  loadingConversations: true,
  setLoadingConversations: (loadingConversations: boolean) =>
    set(() => ({ loadingConversations })),
  convoMessages: new Map(),
  previewMessages: new Map(),
  setPreviewMessage: (key: string, message: DecodedMessage) =>
    set((state) => {
      const newPreviewMessages = new Map(state.previewMessages);
      newPreviewMessages.set(key, message);
      return { previewMessages: newPreviewMessages };
    }),
  setPreviewMessages: (previewMessages) => set(() => ({ previewMessages })),
  addMessages: (key: string, newMessages: DecodedMessage[]) => {
    let numAdded = 0;
    set((state) => {
      const convoMessages = new Map(state.convoMessages);
      const existing = state.convoMessages.get(key) || [];
      const updated = getUniqueMessages([...existing, ...newMessages]);
      numAdded = updated.length - existing.length;
      // If nothing has been added, return the old item to avoid unnecessary refresh
      if (!numAdded) {
        return { convoMessages: state.convoMessages };
      }
      convoMessages.set(key, updated);
      return { convoMessages };
    });
    return numAdded;
  },
  recipientWalletAddress: "",
  setRecipientWalletAddress: (address) =>
    set(() => ({ recipientWalletAddress: address })),
  conversationId: "",
  setConversationId: (conversationId) => set(() => ({ conversationId })),
  recipientInputMode: RecipientInputMode.InvalidEntry,
  setRecipientInputMode: (recipientInputMode) =>
    set(() => ({ recipientInputMode })),
  recipientEnteredValue: "",
  setRecipientEnteredValue: (recipientEnteredValue) =>
    set(() => ({ recipientEnteredValue })),
  resetXmtpState: () =>
    set(() => ({
      client: undefined,
      conversations: new Map(),
      convoMessages: new Map(),
      previewMessages: new Map(),
      recipientWalletAddress: "",
      conversationId: undefined,
      startedFirstMessage: false,
      recipientInputMode: RecipientInputMode.InvalidEntry,
    })),
  startedFirstMessage: false,
  setStartedFirstMessage: (startedFirstMessage) =>
    set(() => ({ startedFirstMessage })),
  attachmentError: "",
  setAttachmentError: (attachmentError) => set(() => ({ attachmentError })),
}));
