import { useEffect, useState } from "react";
import { useEnsAddress, useEnsName } from "wagmi";
import {
  isEnsAddress,
  isValidLongWalletAddress,
  isValidRecipientAddressFormat,
} from "../helpers";
import { useXmtpStore } from "../store/xmtp";
import { address } from "../pages/inbox";
import useEverynameApi from "./useEverynameApi";

const useWalletAddress = (address?: address | string) => {
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );
  const [addressToUse, setAddressToUse] = useState(
    address || recipientWalletAddress,
  );
  const isEns = isEnsAddress(addressToUse);
  console.log(addressToUse, 'address tp ise', recipientWalletAddress)

  // Get full address when only have ENS
  const { data: ensAddress, isLoading: ensAddressLoading } = useEnsAddress({
    name: addressToUse,
    enabled: isEnsAddress(addressToUse),
  });

  // Get ENS if exists from full address
  const { data: ensName, isLoading: ensNameLoading } = useEnsName({
    address: addressToUse as address,
    enabled: isValidLongWalletAddress(addressToUse),
  });

  const resolutionResult = useEverynameApi(addressToUse, recipientWalletAddress);
  console.log(resolutionResult, 'resolution result?')

  //Create a useEverynameReverseResolution()

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
