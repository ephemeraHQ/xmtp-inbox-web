import { useEnsAddress, useEnsName } from 'wagmi';
import { address } from '../components/Address';
import { isEnsAddress, isValidRecipientAddressFormat } from '../helpers';
import { useXmtpStore } from '../store/xmtp';

const useWalletAddress = (address?: address | string) => {
  const recipientWalletAddress = useXmtpStore((state) => state.recipientWalletAddress);
  const addressToUse = address || recipientWalletAddress;

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

  return {
    isValid: isValidRecipientAddressFormat(addressToUse),
    isEns: isEnsAddress(addressToUse),
    ensAddress,
    ensName,
    isLoading: ensAddressLoading || ensNameLoading
  };
};

export default useWalletAddress;
