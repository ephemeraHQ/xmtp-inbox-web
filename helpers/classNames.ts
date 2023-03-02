export function classNames(...classes: (string | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const recipientPillInputStyle = (userIsSender: boolean) =>
  classNames(
    "rounded-2xl",
    "p-1",
    "border",
    "text-md",
    "focus:outline-none",
    "focus:ring-0",
    "font-bold",
    "font-mono",
    "overflow-visible",
    "text-center",
    "select-none",
    "text-black ",
    userIsSender ? "bg-bt-100" : "bg-zinc-50",
    userIsSender ? "border-bt-300" : "border-gray-300",
  );
