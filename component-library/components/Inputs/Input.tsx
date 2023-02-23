import React, { ChangeEvent, useLayoutEffect, useRef } from "react";
import { Avatar } from "../Avatar/Avatar";
import { ArrowUpIcon } from "@heroicons/react/solid";
import { InformationCircleIcon } from "@heroicons/react/outline";
import { Button } from "../Buttons/Button";

interface InputProps {
  /**
   * Is this a message or address input?
   */
  variant?: "message" | "address";
  /**
   * What, if any, subtext is there?
   */
  subtext?: string;
  /**
   * What are the props associated with the avatar?
   */
  avatarUrlProps?: {
    // What is the avatar url?
    avatarUrl: string;
    // Is the avatar url loading?
    isLoading: boolean;
    // What's the address of this wallet?
    address: string;
  };

  /**
   * What happens on a submit?
   */
  onSubmit?: () => void;
  /**
   * Is the CTA button disabled?
   */
  isDisabled?: boolean;
  /**
   * Upon submit, has there been an error?
   */
  isError?: boolean;
  /**
   * Upon submit, is something loading?
   */
  isLoading?: boolean;
  /**
   * Is there a tooltip click event that needs to be handled?
   */
  onTooltipClick?: () => void;
}

const AddressInput = ({
  isError,
  onSubmit,
  avatarUrlProps,
  isLoading,
  subtext,
  onTooltipClick,
}: InputProps) => {
  const subtextColor = isError ? "text-red-400" : "text-gray-400";
  return (
    <div className="flex align-center">
      <form className="flex w-full" onSubmit={onSubmit}>
        <Avatar {...avatarUrlProps} />
        <div className="ml-4">
          {isLoading ? (
            <div role="status" className="max-w-sm animate-pulse m-0 pt-1 pb-3">
              <div className="h-4 bg-gray-200 rounded-full dark:bg-gray-700 w-48 m-0"></div>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <input
              className="text-gray-700 mb-0 pl-0 font-mono text-sm w-full leading-tight border-none focus:ring-0 cursor-text"
              id="address"
              type="text"
              autoFocus
              spellCheck="false"
              autoComplete="false"
              autoCorrect="false"
            />
          )}
          {subtext && (
            <p className={`font-mono text-sm ${subtextColor}`}>{subtext}</p>
          )}
        </div>
      </form>
      <InformationCircleIcon onClick={onTooltipClick} height="24" />
    </div>
  );
};

const MessageInput = ({ onSubmit, isDisabled }: InputProps) => {
  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState("");
  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.target.value);
  const borderStyles =
    "border border-gray-300 focus-within:border-indigo-300 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl";
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
          <Button
            category="icon"
            primary={false}
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

export const Input = ({ variant, ...children }: InputProps) => {
  switch (variant) {
    case "address":
      return <AddressInput {...children} />;
    case "message":
      return <MessageInput {...children} />;
    default:
      return <AddressInput {...children} />;
  }
};
