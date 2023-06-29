export const getRecipientInputSubtext = (
  recipientMode: number,
  recipientEnteredValue: string | undefined,
) => {
  if (!recipientMode && !recipientEnteredValue) {
    return "messages.address_field_prompt";
  }
  switch (recipientMode) {
    case 0:
      return "messages.address_field_invalid";
    case 1:
      return "messages.address_field_loading";
    case 3:
      return "messages.address_field_not_on_network";
    // no default
  }
  return undefined;
};
