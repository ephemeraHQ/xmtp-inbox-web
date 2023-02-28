import {
  CreditCardIcon,
  ShoppingBagIcon,
  SpeakerphoneIcon,
} from "@heroicons/react/outline";
import { EnsAddressIcon } from "../Icons/EnsAddressIcon";
import { LensAddressIcon } from "../Icons/LensAddressIcon";
import { WalletAddressIcon } from "../Icons/WalletAddressIcon";
import { ChatIcon } from "@heroicons/react/solid";

// To-do: update icon and text logic after we receive from design. These are placeholders for now.
export const iconMapping = {
  ["AUDIO" as string]: <SpeakerphoneIcon width="16" />,
  ["MESSAGING" as string]: <ChatIcon width="16" />,
  ["SHOPPING" as string]: <ShoppingBagIcon width="16" />,
  ["TRANSACTIONS" as string]: <CreditCardIcon width="16" />,
  ["WALLET_ADDRESS" as string]: <WalletAddressIcon />,
  ["ENS_ADDRESS" as string]: <EnsAddressIcon />,
  ["LENS_ADDRESS" as string]: <LensAddressIcon />,
};
