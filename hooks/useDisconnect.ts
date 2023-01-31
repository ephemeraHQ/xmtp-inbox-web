import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useAppStore } from '../store/app';
import { useXmtpStore } from '../store/xmtp';
import { useDisconnect as useDisconnectWagmi } from 'wagmi';

const useDisconnect = () => {
  const { disconnect: disconnectWagmi } = useDisconnectWagmi();
  const router = useRouter();
  const resetAppState = useAppStore((state) => state.resetAppState);
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);

  const disconnect = useCallback(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('xmtp')) {
        localStorage.removeItem(key);
      }
    });
    resetAppState();
    resetXmtpState();
    disconnectWagmi();

    router.push('/');
  }, [router]);

  return {
    disconnect
  };
};

export default useDisconnect;
