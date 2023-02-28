import {
  ShareIcon,
  PlusIcon,
  GiftIcon,
  BellIcon,
  EyeIcon,
  ChatAlt2Icon,
  TrashIcon,
} from "@heroicons/react/solid";
import { DisconnectIcon } from "../Icons/DisconnectIcon";

export const enum SettingsIcon {
  CONNECT_WALLET = "connect_wallet",
  CREATE_WALLET = "create_wallet",
  COLLECTIBLES = "collectibles",
  NOTIFICATIONS = "notifications",
  PRIVACY = "privacy",
  SUPPORT = "support",
  DATA = "data",
  DISCONNECT = "disconnect",
}

export const iconMapping = {
  [SettingsIcon.CONNECT_WALLET]: {
    icon: <ShareIcon width="24" className="text-indigo-600" />,
    backgroundColor: null,
  },
  [SettingsIcon.CREATE_WALLET]: {
    icon: <PlusIcon width="24" className="text-indigo-600" />,
    backgroundColor: null,
  },
  [SettingsIcon.COLLECTIBLES]: {
    icon: <GiftIcon width="16" color="green" />,
    backgroundColor: "bg-green-100",
  },
  [SettingsIcon.NOTIFICATIONS]: {
    icon: <BellIcon width="16" color="green" />,
    backgroundColor: "bg-green-100",
  },
  [SettingsIcon.PRIVACY]: {
    icon: <EyeIcon width="16" className="text-indigo-600" />,
    backgroundColor: "bg-blue-100",
  },
  [SettingsIcon.SUPPORT]: {
    icon: <ChatAlt2Icon width="16" className="text-indigo-600" />,
    backgroundColor: "bg-blue-100",
  },
  [SettingsIcon.DATA]: {
    icon: <TrashIcon width="16" color="red" />,
    backgroundColor: "bg-red-100",
  },
  [SettingsIcon.DISCONNECT]: {
    icon: <DisconnectIcon />,
    backgroundColor: "bg-red-100",
  },
};
