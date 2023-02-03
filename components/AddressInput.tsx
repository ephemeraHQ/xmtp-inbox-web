import React, { useEffect, useRef } from 'react';
import { classNames, getConversationKey } from '../helpers';
import { useXmtpStore } from '../store/xmtp';
import { useAccount } from 'wagmi';
import useWalletAddress from '../hooks/useWalletAddress';

type AddressInputProps = {
  conversationId?: string;
  id?: string;
  name?: string;
  className?: string;
  placeholder?: string;
  onInputChange?: (e: React.SyntheticEvent) => void;
};

const AddressInput = ({
  conversationId,
  id,
  className,
  placeholder,
  onInputChange
}: AddressInputProps): JSX.Element => {
  const recipientWalletAddress = useXmtpStore((state) => state.recipientWalletAddress);
  const setRecipientWalletAddress = useXmtpStore((state) => state.setRecipientWalletAddress);
  const { isValid, isEns, ensAddress, ensName } = useWalletAddress();

  const { address: walletAddress } = useAccount();
  const client = useXmtpStore((state) => state.client);
  const conversations = useXmtpStore((state) => state.conversations);
  const setConversations = useXmtpStore((state) => state.setConversations);

  const inputElement = useRef(null);

  const focusInputElementRef = () => {
    (inputElement.current as any)?.focus();
  };

  useEffect(() => {
    if (!recipientWalletAddress) {
      focusInputElementRef();
      setRecipientWalletAddress('');
    }
  }, [recipientWalletAddress]);

  useEffect(() => {
    const setLookupValue = async () => {
      if (isValid && isEns && ensAddress) {
        const conversation = conversationId
          ? await client?.conversations?.newConversation(ensAddress, {
              conversationId,
              metadata: {}
            })
          : await client?.conversations?.newConversation(ensAddress);

        if (conversation) {
          conversations.set(getConversationKey(conversation), conversation);
          setConversations(new Map(conversations));
        }
      } else if (isValid && !isEns) {
        const conversation = conversationId
          ? await client?.conversations?.newConversation(recipientWalletAddress, {
              conversationId,
              metadata: {}
            })
          : await client?.conversations?.newConversation(recipientWalletAddress);
        if (conversation) {
          conversations.set(getConversationKey(conversation), conversation);
          setConversations(new Map(conversations));
        }
      }
    };
    setLookupValue();
  }, [isValid, ensAddress, ensName]);

  const userIsSender = recipientWalletAddress === walletAddress;

  const recipientPillInputStyle = classNames(
    'absolute',
    'top-[4px] md:top-[2px]',
    'left-[26px] md:left-[23px]',
    'rounded-2xl',
    'px-[5px] md:px-2',
    'border',
    'text-md',
    'focus:outline-none',
    'focus:ring-0',
    'font-bold',
    'font-mono',
    'overflow-visible',
    'text-center',
    'text-transparent',
    'select-none',
    userIsSender ? 'bg-bt-100' : 'bg-zinc-50',
    userIsSender ? 'border-bt-300' : 'border-gray-300'
  );

  return (
    <div className="relative mb-5">
      {isValid && <span className={recipientPillInputStyle}>{recipientWalletAddress}</span>}
      <input
        id={id}
        name="recipient"
        className={classNames(
          className || '',
          'absolute top-0 left-0',
          userIsSender ? '!text-b-600' : '',
          isValid ? '!text-md font-bold top-[2px] left-1' : ''
        )}
        placeholder={placeholder}
        onChange={onInputChange}
        value={recipientWalletAddress}
        ref={inputElement}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        data-testid="message-to-input"
      />
    </div>
  );
};

export default AddressInput;
