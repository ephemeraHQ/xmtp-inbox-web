import { useEffect, useState } from 'react';
import { useEnsAddress, useEnsName } from 'wagmi';
import { address } from '../components/Address';
import { isEnsAddress, isValidRecipientAddressFormat } from '../helpers';
import { useXmtpStore } from '../store/xmtp';

const useWalletAddress = (address?: address | string) => {
  const recipientWalletAddress = useXmtpStore((state) => state.recipientWalletAddress);
  const setConversationId = useXmtpStore((state) => state.setConversationId);
  const [addressToUse, setAddressToUse] = useState(address || recipientWalletAddress);
  const isEns = isEnsAddress(addressToUse);

  // Get full address when only have ENS
  const { data: ensAddress, isLoading: ensAddressLoading } = useEnsAddress({
    name: addressToUse,
    enabled: isEnsAddress(addressToUse)
  });

  // Get ENS if exists from full address
  const { data: ensName, isLoading: ensNameLoading } = useEnsName({
    address: addressToUse as address,
    enabled: addressToUse?.startsWith('0x') && addressToUse.length === 42
  });

  useEffect(() => {
    setAddressToUse(address || recipientWalletAddress);
  }, [recipientWalletAddress, address]);

  useEffect(() => {
    if (isEns && ensAddress && !ensAddressLoading) {
      setConversationId(ensAddress);
    }
  }, [isEns, ensAddress, ensAddressLoading]);

  return {
    isValid: isValidRecipientAddressFormat(addressToUse),
    isEns,
    ensAddress: ensAddress,
    ensName,
    isLoading: ensAddressLoading || ensNameLoading
  };
};

export default useWalletAddress;
