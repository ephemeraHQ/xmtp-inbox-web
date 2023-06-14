import {
  BookOpenIcon,
  ChatAltIcon,
  SparklesIcon,
} from "@heroicons/react/solid";

export const enum InfoCardIcon {
  NEW_MESSAGE = "new_message",
  GALLERY = "gallery",
  DOCUMENTATION = "documentation",
}

export const iconMapping: Record<
  InfoCardIcon,
  { icon: React.ReactElement; backgroundColor: string }
> = {
  [InfoCardIcon.NEW_MESSAGE]: {
    icon: <ChatAltIcon width="24" className="text-indigo-600" />,
    backgroundColor: "bg-indigo-100",
  },
  [InfoCardIcon.GALLERY]: {
    icon: <SparklesIcon width="24" className="text-indigo-600" />,
    backgroundColor: "bg-indigo-100",
  },
  [InfoCardIcon.DOCUMENTATION]: {
    icon: <BookOpenIcon width="24" className="text-indigo-600" />,
    backgroundColor: "bg-indigo-100",
  },
};
