import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useXmtpStore } from '../store/xmtp';
import { useDisconnect as useDisconnectWagmi } from 'wagmi';

const useDisconnect = () => {
  const { disconnect: disconnectWagmi } = useDisconnectWagmi();
  const router = useRouter();
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);

  const disconnect = useCallback(() => {
    resetXmtpState();
    disconnectWagmi();

    router.push('/');
  }, [router]);

  return {
    disconnect
  };
};

export default useDisconnect;
