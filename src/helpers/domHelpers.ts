import type { RecipientState } from "../store/xmtp";

export const getRecipientInputSubtext = (
  recipientState: RecipientState,
  recipientInput: string,
  recipientOnNetwork: boolean,
) => {
  if (!recipientInput) {
    return "messages.address_field_prompt";
  }

  if (!recipientOnNetwork) {
    return "messages.address_field_not_on_network";
  }

  switch (recipientState) {
    case "invalid":
      return "messages.address_field_invalid";
    case "loading":
      return "messages.address_field_loading";
    // no default
  }
  return undefined;
};
