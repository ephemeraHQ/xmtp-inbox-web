import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { useAppStore } from '../store/app';
import { useXmtpStore } from '../store/xmtp';

const useDisconnect = () => {
  const router = useRouter();
  const resetAppState = useAppStore((state) => state.resetAppState);
  const resetXmtpState = useXmtpStore((state) => state.resetXmtpState);

  const disconnect = useCallback(() => {
    Object.keys(localStorage).forEach((key) => {
      // This will clear the conversation cache + the private keys
      if (key.startsWith('xmtp')) {
        localStorage.removeItem(key);
      }
    });
    resetAppState();
    resetXmtpState();
    router.push('/');
  }, [router]);

  return {
    disconnect
  };
};

export default useDisconnect;
