export function classNames(...classes: (string | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export const recipientPillInputStyle = () =>
  classNames(
    "p-1",
    "text-md",
    "font-bold",
    "font-mono",
    "overflow-visible",
    "text-black ",
    "ml-2",
  );
