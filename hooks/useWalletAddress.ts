import { useEffect, useState } from "react";
import { useEnsAddress, useEnsName } from "wagmi";
import {
  isEverynameAddress,
  isValidLongWalletAddress,
  isValidRecipientAddressFormat,
} from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { address } from "../pages/inbox";

//JOHANNA: This hook should be refactored to use Everynames API instead
const useWalletAddress = (address?: address | string) => {
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const [addressToUse, setAddressToUse] = useState(
    address || recipientWalletAddress,
  );
  const isEns = isEverynameAddress(addressToUse);

  // Get full address when only have ENS
  const { data: ensAddress, isLoading: ensAddressLoading } = useEnsAddress({
    name: addressToUse,
    enabled: isEverynameAddress(addressToUse),
  });

  // Get ENS if exists from full address
  const { data: ensName, isLoading: ensNameLoading } = useEnsName({
    address: addressToUse as address,
    enabled: isValidLongWalletAddress(addressToUse),
  });

  useEffect(() => {
    setAddressToUse(address || recipientWalletAddress);
  }, [recipientWalletAddress, address]);

  return {
    isValid: isValidRecipientAddressFormat(addressToUse),
    isEns,
    ensAddress,
    ensName,
    isLoading: ensAddressLoading || ensNameLoading,
  };
};

export default useWalletAddress;
