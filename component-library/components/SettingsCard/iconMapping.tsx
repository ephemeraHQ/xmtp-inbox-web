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

export const iconMapping = {
  ["CONNECT_WALLET" as string]: {
    icon: <ShareIcon width="24" className="text-indigo-600" />,
    backgroundColor: null,
  },
  ["CREATE_WALLET" as string]: {
    icon: <PlusIcon width="24" className="text-indigo-600" />,
    backgroundColor: null,
  },
  ["COLLECTIBLES" as string]: {
    icon: <GiftIcon width="16" color="green" />,
    backgroundColor: "bg-green-100",
  },
  ["NOTIFICATIONS" as string]: {
    icon: <BellIcon width="16" color="green" />,
    backgroundColor: "bg-green-100",
  },
  ["PRIVACY" as string]: {
    icon: <EyeIcon width="16" className="text-indigo-600" />,
    backgroundColor: "bg-blue-100",
  },
  ["SUPPORT" as string]: {
    icon: <ChatAlt2Icon width="16" className="text-indigo-600" />,
    backgroundColor: "bg-blue-100",
  },
  ["DATA" as string]: {
    icon: <TrashIcon width="16" color="red" />,
    backgroundColor: "bg-red-100",
  },
  ["DISCONNECT" as string]: {
    icon: <DisconnectIcon />,
    backgroundColor: "bg-red-100",
  },
};
