import { Conversation } from "@xmtp/react-sdk";
import { ALLOWED_ENS_SUFFIXES, ALLOWED_UNS_SUFFIXES } from "./constants";
import { utils } from "ethers";

export const truncate = (str: string | undefined, length: number): string => {
  if (!str) {
    return "";
  }
  if (str.length > length) {
    return `${str.substring(0, length - 3)}...`;
  }
  return str;
};

export const formatDate = (d: Date | undefined): string =>
  d ? d.toLocaleDateString("en-US") : "";

export const formatTime = (d: Date | undefined): string =>
  d
    ? d
        .toLocaleTimeString(undefined, {
          hour12: true,
          hour: "numeric",
          minute: "2-digit",
        })
        // ICU 72.1 may use different unicode space characters
        .replace(/\u202f|\u2009/g, " ")
    : "";

export const isEnsAddress = (address: string): boolean => {
  // Bail out early if empty string or a string without any dots
  if (!address || !address.includes(".")) {
    return false;
  }

  return ALLOWED_ENS_SUFFIXES.some((suffix) => address.endsWith(suffix));
};

export const isUnsAddress = (address: string): boolean => {
  // Bail out early if empty string or a string without any dots
  if (!address || !address.includes(".")) {
    return false;
  }
  return ALLOWED_UNS_SUFFIXES.some((suffix) => address.endsWith(suffix));
};

export const fetchUnsName = async (
  address: string | undefined,
): Promise<string | null> => {
  if (process.env.VITE_UNS_TOKEN && address) {
    try {
      const response = await fetch(
        `https://resolve.unstoppabledomains.com/reverse/${address.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.VITE_UNS_TOKEN}`,
          },
        },
      );

      const domainJson = await response.json();
      return domainJson?.meta?.domain ? domainJson?.meta?.domain : null;
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

export const fetchUnsAddress = async (
  name: string | undefined,
): Promise<string | null> => {
  if (process.env.VITE_UNS_TOKEN && name) {
    try {
      const response = await fetch(
        `https://resolve.unstoppabledomains.com/domains/${name}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.VITE_UNS_TOKEN}`,
          },
        },
      );
      const domainJson = await response.json();
      if (
        domainJson?.meta?.owner === "0x0000000000000000000000000000000000000000"
      )
        return null;
      return domainJson?.meta?.owner ? domainJson?.meta?.owner : null;
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

export const isValidRecipientAddressFormat = (
  recipientWalletAddress: string,
) => {
  return (
    isEnsAddress(recipientWalletAddress) ||
    isUnsAddress(recipientWalletAddress) ||
    (recipientWalletAddress?.startsWith("0x") &&
      recipientWalletAddress?.length === 42)
  );
};

export const isValidLongWalletAddress = (recipientWalletAddress: string) => {
  return (
    recipientWalletAddress?.startsWith("0x") &&
    recipientWalletAddress?.length === 42
  );
};

export const shortAddress = (addr: string): string =>
  addr.length > 10 && addr.startsWith("0x")
    ? `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`
    : addr;

export const getConversationId = (conversation?: Conversation): string => {
  return conversation?.context?.conversationId
    ? `${conversation?.peerAddress}/${conversation?.context?.conversationId}`
    : conversation?.peerAddress ?? "";
};

export const getAddress = (conversationId: string) => {
  let addr;
  try {
    addr = utils.getAddress(conversationId);
  } catch {
    addr = conversationId;
  }
  return addr;
};
