import { getEnsAvatar, getEnsName, getEnsAddress } from "@wagmi/core";
import { getAddress } from "viem";
import { ALLOWED_UNS_SUFFIXES, API_FETCH_THROTTLE } from "./constants";
import { memoizeThrottle } from "./functions";
import { getWagmiConfig } from "./config";

export type ETHAddress = `0x${string}`;

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

const getMinimumNameLength = (suffixes: string[]) =>
  suffixes.reduce((result, suffix) => Math.min(result, suffix.length), 0);

// ENS names can use domains TLDs
export const isEnsName = (value: string): boolean => {
  // value must have a minimum length and contain a dot
  if (value.length < 3 || !value.includes(".")) {
    return false;
  }
  return true;
};

export const isUnsName = (value: string): boolean => {
  // value must have a minimum length and contain a dot
  if (
    value.length < getMinimumNameLength(ALLOWED_UNS_SUFFIXES) ||
    !value.includes(".")
  ) {
    return false;
  }
  return ALLOWED_UNS_SUFFIXES.some((suffix) => value.endsWith(suffix));
};

type UnstoppableDomainsDomainResponse = {
  meta?: {
    resolver?: string;
    blockchain?: string;
    networkId?: number;
    registry?: string;
    domain?: string;
    namehash?: string;
    tokenId?: string;
    owner?: string;
    reverse?: boolean;
  };
};

export const throttledFetchEnsAddress = memoizeThrottle(
  getEnsAddress,
  API_FETCH_THROTTLE,
  undefined,
  (_, { name }) => name,
);

export const throttledFetchEnsName = memoizeThrottle(
  getEnsName,
  API_FETCH_THROTTLE,
  undefined,
  (_, { address }) => address,
);

export const throttledFetchEnsAvatar = memoizeThrottle(
  getEnsAvatar,
  API_FETCH_THROTTLE,
  undefined,
  (_, { name }) => name,
);

const fetchUnsName = async (address: ETHAddress) => {
  if (import.meta.env.VITE_UNS_TOKEN) {
    try {
      const response = await fetch(
        `https://api.unstoppabledomains.com/resolve/reverse/${address.toLowerCase()}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_UNS_TOKEN}`,
          },
        },
      );

      const domainJson =
        (await response.json()) as UnstoppableDomainsDomainResponse;
      return domainJson?.meta?.domain ? domainJson?.meta?.domain : null;
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

export const throttledFetchUnsName = memoizeThrottle(
  fetchUnsName,
  API_FETCH_THROTTLE,
);

const fetchAddressName = async (address: ETHAddress) => {
  let name = await throttledFetchEnsName(getWagmiConfig(), { address });
  if (!name) {
    name = await throttledFetchUnsName(address);
  }
  return name;
};

export const throttledFetchAddressName = memoizeThrottle(
  fetchAddressName,
  API_FETCH_THROTTLE,
);

type UnstoppableDomainsBulkDomainResponse = {
  data: Array<UnstoppableDomainsDomainResponse>;
};

const fetchUnsNames = async (addresses: ETHAddress[]) => {
  const result: { [key: ETHAddress]: string } = {};
  if (import.meta.env.VITE_UNS_TOKEN) {
    if (addresses.length === 1) {
      const domain = await fetchUnsName(addresses[0]);
      if (domain) {
        result[addresses[0]] = domain;
      }
      return result;
    }
    try {
      const response = await fetch(
        `https://api.unstoppabledomains.com/resolve/reverse/query`,
        {
          method: "POST",
          body: JSON.stringify({ addresses }),
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_UNS_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      const domainJson = (
        (await response.json()) as UnstoppableDomainsBulkDomainResponse
      ).data;
      domainJson.forEach((domain) => {
        if (domain.meta?.owner && domain.meta?.domain) {
          // ensure address is a checksum address
          result[getAddress(domain.meta.owner)] = domain.meta.domain;
        }
      });
      return result;
    } catch {
      return result;
    }
  } else {
    return result;
  }
};

export const throttledFetchUnsNames = memoizeThrottle(
  fetchUnsNames,
  API_FETCH_THROTTLE,
  undefined,
  (addresses) => addresses.join(","),
);

const fetchUnsAddress = async (name: string) => {
  if (import.meta.env.VITE_UNS_TOKEN) {
    try {
      const response = await fetch(
        `https://api.unstoppabledomains.com/resolve/domains/${name}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_UNS_TOKEN}`,
          },
        },
      );
      const domainJson =
        (await response.json()) as UnstoppableDomainsDomainResponse;
      if (
        domainJson?.meta?.owner === "0x0000000000000000000000000000000000000000"
      )
        return null;
      return domainJson?.meta?.owner
        ? // ensure address is a checksum address
          getAddress(domainJson?.meta?.owner)
        : null;
    } catch {
      return null;
    }
  } else {
    return null;
  }
};

export const throttledFetchUnsAddress = memoizeThrottle(
  fetchUnsAddress,
  API_FETCH_THROTTLE,
);

export const isValidLongWalletAddress = (
  address: string,
): address is ETHAddress => address.startsWith("0x") && address.length === 42;

export const isValidRecipientAddressFormat = (address: string) =>
  isEnsName(address) || isUnsName(address) || isValidLongWalletAddress(address);

export const shortAddress = (address: string): string =>
  isValidLongWalletAddress(address)
    ? `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
    : address;
