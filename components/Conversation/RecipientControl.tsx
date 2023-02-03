import { useState, useEffect, useCallback } from 'react';
import AddressInput from '../AddressInput';
import { getConversationIdFromAddress } from '../../helpers';
import { address } from '../Address';
import { useXmtpStore } from '../../store/xmtp';
import Conversation from './Conversation';
import BackArrow from '../BackArrow';
import useWalletAddress from '../../hooks/useWalletAddress';

const RecipientInputMode = {
  InvalidEntry: 0,
  ValidEntry: 1,
  FindingEntry: 2,
  Submitted: 3,
  NotOnNetwork: 4
};

const RecipientControl = (): JSX.Element => {
  const client = useXmtpStore((state) => state.client);
  const recipientWalletAddress = useXmtpStore((state) => state.recipientWalletAddress) || '';
  const setRecipientWalletAddress = useXmtpStore((state) => state.setRecipientWalletAddress);
  const [recipientOnNetwork, setRecipientOnNetwork] = useState(false);
  const { isValid, isEns, ensName, ensAddress } = useWalletAddress();

  const conversationId = getConversationIdFromAddress(isEns ? ensAddress : recipientWalletAddress);

  const [recipientInputMode, setRecipientInputMode] = useState(RecipientInputMode.InvalidEntry);

  const checkIfOnNetwork = useCallback(
    async (address: string): Promise<boolean> => {
      return client?.canMessage(address) || false;
    },
    [client]
  );

  const completeSubmit = async (address: string) => {
    if (await checkIfOnNetwork(address)) {
      setRecipientOnNetwork(true);
      setRecipientInputMode(RecipientInputMode.Submitted);
    } else {
      setRecipientInputMode(RecipientInputMode.NotOnNetwork);
    }
  };

  const handleSubmit = async () => {
    event?.preventDefault();

    if (isEns) {
      setRecipientInputMode(RecipientInputMode.FindingEntry);
      if (ensAddress) {
        await completeSubmit(ensAddress);
      } else {
        setRecipientInputMode(RecipientInputMode.InvalidEntry);
      }
    } else if (recipientWalletAddress?.startsWith('0x') && recipientWalletAddress?.length === 42) {
      await completeSubmit(recipientWalletAddress);
    }
  };

  useEffect(() => {
    if (isValid && !isEns) {
      setRecipientInputMode(RecipientInputMode.Submitted);
    } else {
      setRecipientInputMode(RecipientInputMode.InvalidEntry);
    }
  }, [recipientWalletAddress]);

  useEffect(() => {
    setRecipientOnNetwork(false);
    if (isValid) {
      handleSubmit();
    } else {
      setRecipientInputMode(RecipientInputMode.InvalidEntry);
    }
  }, [isValid, ensName]);

  return (
    <>
      <div className="flex-1 flex-col">
        <div className="md:hidden flex items-center ml-3">
          <BackArrow onClick={() => setRecipientWalletAddress('')} />
        </div>
        <div className="flex-1 flex-col justify-center flex bg-zinc-50 md:border-b md:border-gray-200 md:px-4 md:pb-[2px]">
          <form className="w-full flex pl-2 md:pl-0 h-8 pt-1" action="#" method="GET">
            <label htmlFor="recipient-field" className="sr-only">
              Recipient
            </label>
            <div className="relative w-full text-n-300 focus-within:text-n-600">
              <div
                className="absolute top-1 left-0 flex items-center pointer-events-none text-md md:text-sm font-medium md:font-semibold"
                data-testid="message-to-key"
              >
                To:
              </div>
              <AddressInput
                conversationId={conversationId}
                id="recipient-field"
                className="block w-[95%] pl-7 pr-3 pt-[3px] md:pt-[2px] md:pt-[1px] bg-transparent caret-n-600 text-n-600 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent text-lg font-mono"
                onInputChange={(e) => {
                  setRecipientWalletAddress((e.target as HTMLInputElement).value);
                }}
              />
              <button type="submit" className="hidden" />
            </div>
          </form>

          {recipientInputMode === RecipientInputMode.Submitted ? (
            <div className="text-md text-n-300 text-sm font-mono ml-10 md:ml-8 pb-1 md:pb-[1px]">
              {isEns ? ensAddress : <br />}
            </div>
          ) : (
            <div
              className="text-sm md:text-xs text-n-300 ml-[29px] pl-2 md:pl-0 pb-1 md:pb-[3px]"
              data-testid="message-to-subtext"
            >
              {recipientInputMode === RecipientInputMode.NotOnNetwork &&
                'Recipient is not on the XMTP network'}
              {recipientInputMode === RecipientInputMode.FindingEntry && 'Finding ENS domain...'}
              {recipientInputMode === RecipientInputMode.InvalidEntry &&
                'Please enter a valid wallet address'}
              {recipientInputMode === RecipientInputMode.ValidEntry && <br />}
            </div>
          )}
        </div>
        {recipientOnNetwork && <Conversation />}
      </div>
    </>
  );
};

export default RecipientControl;
