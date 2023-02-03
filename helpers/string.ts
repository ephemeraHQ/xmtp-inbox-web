import { Conversation } from '@xmtp/xmtp-js';

export const truncate = (str: string | undefined, length: number): string => {
  if (!str) {
    return '';
  }
  if (str.length > length) {
    return `${str.substring(0, length - 3)}...`;
  }
  return str;
};

export const formatDate = (d: Date | undefined): string => (d ? d.toLocaleDateString('en-US') : '');

export const formatTime = (d: Date | undefined): string =>
  d
    ? d.toLocaleTimeString(undefined, {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
      })
    : '';

export const isValidRecipientAddressFormat = (recipientWalletAddress: string) => {
  return (
    recipientWalletAddress?.endsWith('.eth') ||
    (recipientWalletAddress?.startsWith('0x') && recipientWalletAddress?.length === 42)
  );
};

export const isEnsAddress = (address: string): boolean => {
  return address.endsWith('.eth');
};

export const shortAddress = (addr: string): string =>
  addr.length > 10 && addr.startsWith('0x')
    ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
    : addr;

export const getConversationKey = (conversation?: Conversation): string => {
  return conversation?.context?.conversationId
    ? `${conversation?.peerAddress}/${conversation?.context?.conversationId}`
    : conversation?.peerAddress ?? '';
};

export const getConversationIdFromAddress = (
  address: string | Array<string> | undefined | null
): string | undefined => {
  return Array.isArray(address) && address.length > 1 ? address.slice(1).join('/') : undefined;
};
