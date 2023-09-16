import { useConversations } from "@xmtp/react-sdk";
import { useEffect } from "react";
import { useXmtpStore } from "../store/xmtp";

const useListConversations = () => {
  const setLoadingConversations = useXmtpStore(
    (state) => state.setLoadingConversations,
  );

  useEffect(() => {
    if (
      "Notification" in window &&
      window.Notification.permission === "default"
    ) {
      void window.Notification.requestPermission();
    }
  }, []);

  const { conversations, isLoaded, isLoading, error } = useConversations();

  useEffect(() => {
    setLoadingConversations(isLoading);
  }, [isLoading, setLoadingConversations]);

  return {
    conversations,
    error,
    isLoaded,
    isLoading,
  };
};

export default useListConversations;
