import {
  CreditCardIcon,
  ShoppingBagIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/outline";
import { EnsAddressIcon } from "../Icons/EnsAddressIcon";
import { LensAddressIcon } from "../Icons/LensAddressIcon";
import { WalletAddressIcon } from "../Icons/WalletAddressIcon";
import { ChatIcon } from "@heroicons/react/solid";

export const enum TagIcon {
  AUDIO = "audio",
  MESSAGING = "messaging",
  SHOPPING = "shopping",
  TRANSACTIONS = "transactions",
  WALLET_ADDRESS = "wallet_address",
  ENS_ADDRESS = "ens_address",
  LENS_ADDRESS = "lens_address",
}

// To-do: update icon and text logic after we receive from design. These are placeholders for now.
export const iconMapping = {
  [TagIcon.AUDIO]: <SpeakerphoneIcon width="16" />,
  [TagIcon.MESSAGING]: <ChatIcon width="16" />,
  [TagIcon.SHOPPING]: <ShoppingBagIcon width="16" />,
  [TagIcon.TRANSACTIONS]: <CreditCardIcon width="16" />,
  [TagIcon.WALLET_ADDRESS]: <WalletAddressIcon />,
  [TagIcon.ENS_ADDRESS]: <EnsAddressIcon />,
  [TagIcon.LENS_ADDRESS]: <LensAddressIcon />,
};
