import React, { ChangeEvent, useLayoutEffect, useRef } from "react";
import { ArrowUpIcon } from "@heroicons/react/solid";
import { IconButton } from "../IconButton/IconButton";

interface InputProps {
  /**
   * What happens on a submit?
   */
  onSubmit?: () => void;
  /**
   * Is the CTA button disabled?
   */
  isDisabled?: boolean;
}

export const MessageInput = ({ onSubmit, isDisabled }: InputProps) => {
  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState("");
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.target.value);
  const borderStyles =
    "flex items-center border border-gray-300 focus-within:border-indigo-300 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl";
  const textAreaStyles = `${
    textAreaRef?.current?.scrollHeight &&
    textAreaRef?.current?.scrollHeight <= 32
      ? "max-h-8"
      : "max-h-40"
  } min-h-8 outline-none border-none focus:ring-0 resize-none mr-0 mx-4 p-1 w-full text-md text-gray-900"`;

  useLayoutEffect(() => {
    const MIN_TEXTAREA_HEIGHT = 8;
    if (textAreaRef?.current) {
      let currentScrollHeight = textAreaRef?.current.scrollHeight;
      // Reset height - important to shrink on delete
      textAreaRef.current.style.height = "inherit";
      textAreaRef.current.style.height = `${Math.max(
        currentScrollHeight,
        MIN_TEXTAREA_HEIGHT,
      )}px`;
    }
  }, [value]);

  return (
    <form>
      <label htmlFor="chat" className="sr-only">
        Type something...
      </label>
      <div className={`flex items-end max-h-300 ${borderStyles}`}>
        <textarea
          id="chat"
          onChange={onChange}
          ref={textAreaRef}
          rows={1}
          className={textAreaStyles}
          placeholder="Type something..."
          value={value}
        />

        <div className="flex items-center p-1">
          <IconButton
            variant="secondary"
            label={<ArrowUpIcon color="white" width="12" />}
            srText="Submit Message"
            onClick={onSubmit}
            isDisabled={isDisabled}
          />
        </div>
      </div>
    </form>
  );
};
