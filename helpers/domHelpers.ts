export const getRecipientInputSubtext = (recipientMode: number) => {
  switch (recipientMode) {
    case 0:
      return "Please enter a valid wallet address";
    case 1:
      return "Finding ENS domain...";
    case 3:
      return "Recipient is not on the XMTP network";
  }
};
