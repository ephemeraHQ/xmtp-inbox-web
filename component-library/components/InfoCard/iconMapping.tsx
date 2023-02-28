import {
  BookOpenIcon,
  ChatAltIcon,
  SparklesIcon,
} from "@heroicons/react/solid";

export const iconMapping = {
  ["NEW_MESSAGE" as string]: {
    icon: <ChatAltIcon width="24" className="text-indigo-600" />,
    backgroundColor: "bg-indigo-100",
  },
  ["GALLERY" as string]: {
    icon: <SparklesIcon width="24" className="text-indigo-600" />,
    backgroundColor: "bg-indigo-100",
  },
  ["DOCUMENTATION" as string]: {
    icon: <BookOpenIcon width="24" className="text-indigo-600" />,
    backgroundColor: "bg-indigo-100",
  },
};
