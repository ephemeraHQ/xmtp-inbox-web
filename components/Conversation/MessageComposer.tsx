import React, { useEffect, useState } from "react";
import { classNames } from "../../helpers";
import messageComposerStyles from "../../styles/MessageComposer.module.css";
import upArrowGreen from "../../public/up-arrow-green.svg";
import upArrowGrey from "../../public/up-arrow-grey.svg";
import Image from "next/image";
import { useXmtpStore } from "../../store/xmtp";

type MessageComposerProps = {
  onSend: (msg: string) => Promise<void>;
};

const MessageComposer = ({ onSend }: MessageComposerProps): JSX.Element => {
  const [message, setMessage] = useState("");
  const recipientWalletAddress = useXmtpStore(
    (state) => state.recipientWalletAddress,
  );

  useEffect(() => setMessage(""), [recipientWalletAddress]);

  const onMessageChange = (e: React.FormEvent<HTMLInputElement>) =>
    setMessage(e.currentTarget.value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) {
      return;
    }
    setMessage("");
    await onSend(message);
  };

  return (
    <div className={classNames("bg-white", "flex", "items-center")}>
      <form
        className={classNames(
          "flex",
          "m-2",
          "w-full",
          "border",
          "py-2",
          "pl-4",
          "mr-3",
          "drop-shadow-xl",
          "mt-0",
          messageComposerStyles.bubble,
        )}
        autoComplete="off"
        onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Type something..."
          className={classNames(
            "block",
            "w-full",
            "text-md",
            "md:text-sm",

            messageComposerStyles.input,
          )}
          name="message"
          value={message}
          onChange={onMessageChange}
          required
          data-testid="message-input"
        />
        <button
          type="submit"
          className={messageComposerStyles.arrow}
          data-testid="message-input-submit">
          {!message ? (
            <Image src={upArrowGrey} alt="send" height={32} width={32} />
          ) : (
            <Image src={upArrowGreen} alt="send" height={32} width={32} />
          )}
        </button>
      </form>
    </div>
  );
};

export default MessageComposer;
