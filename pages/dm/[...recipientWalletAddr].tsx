import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Conversation } from '../../components/Conversation';
import { useEnsAddress } from 'wagmi';

const ConversationPage: NextPage = () => {
  const router = useRouter();
  const [recipientWalletAddr, setRecipientWalletAddr] = useState<string>();
  const { data: address } = useEnsAddress({
    name: recipientWalletAddr
  });

  useEffect(() => {
    const routeAddress =
      (Array.isArray(router.query.recipientWalletAddr)
        ? router.query.recipientWalletAddr.join('/')
        : router.query.recipientWalletAddr) ?? '';
    setRecipientWalletAddr(routeAddress);
  }, [router.query.recipientWalletAddr]);

  useEffect(() => {
    const checkIfEns = async () => {
      if (recipientWalletAddr?.includes('.eth') && address) {
        router.push(`/dm/${address}`);
      }
    };
    checkIfEns();
  }, [recipientWalletAddr, window.location.pathname, address]);

  return <Conversation recipientWalletAddr={recipientWalletAddr ?? ''} />;
};

export default React.memo(ConversationPage);
