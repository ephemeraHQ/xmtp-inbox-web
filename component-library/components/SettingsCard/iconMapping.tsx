import { CogIcon, QrcodeIcon } from "@heroicons/react/outline";
import {
  ShareIcon,
  PlusIcon,
  GiftIcon,
  BellIcon,
  EyeIcon,
  ChatAlt2Icon,
  TrashIcon,
} from "@heroicons/react/solid";
import { BellSlashIcon } from "../Icons/BellSlashIcon";
import { DisconnectIcon } from "../Icons/DisconnectIcon";

export const enum SettingsIcon {
  CONNECT_WALLET = "connect_wallet",
  COLLECTIBLES = "collectibles",
  CREATE_WALLET = "create_wallet",
  DATA = "data",
  DISCONNECT = "disconnect",
  MUTE = "mute",
  NOTIFICATIONS = "notifications",
  PRIVACY = "privacy",
  QR_CODE = "qr_code",
  SETTINGS = "settings",
  SUPPORT = "support",
}

export const iconMapping = {
  [SettingsIcon.CONNECT_WALLET]: {
    icon: <ShareIcon width="16" className="text-indigo-600" />,
    backgroundColor: null,
  },
  [SettingsIcon.COLLECTIBLES]: {
    icon: <GiftIcon width="16" color="green" />,
    backgroundColor: "bg-green-100",
  },
  [SettingsIcon.CREATE_WALLET]: {
    icon: <PlusIcon width="20" className="text-indigo-600 font-bold" />,
    backgroundColor: null,
  },
  [SettingsIcon.DATA]: {
    icon: <TrashIcon width="16" color="red" />,
    backgroundColor: "bg-red-100",
  },
  [SettingsIcon.DISCONNECT]: {
    icon: <DisconnectIcon />,
    backgroundColor: "bg-red-100",
  },
  [SettingsIcon.MUTE]: {
    icon: <BellSlashIcon />,
    backgroundColor: "bg-red-100",
  },
  [SettingsIcon.NOTIFICATIONS]: {
    icon: <BellIcon width="16" color="green" />,
    backgroundColor: "bg-green-100",
  },
  [SettingsIcon.PRIVACY]: {
    icon: <EyeIcon width="16" className="text-indigo-600" />,
    backgroundColor: "bg-blue-100",
  },
  [SettingsIcon.QR_CODE]: {
    icon: <QrcodeIcon width="16" className="text-indigo-600" />,
    backgroundColor: "bg-blue-100",
  },
  [SettingsIcon.SETTINGS]: {
    icon: <CogIcon width="16" className="text-indigo-600" />,
    backgroundColor: "bg-blue-100",
  },
  [SettingsIcon.SUPPORT]: {
    icon: <ChatAlt2Icon width="16" className="text-indigo-600" />,
    backgroundColor: "bg-blue-100",
  },
};
