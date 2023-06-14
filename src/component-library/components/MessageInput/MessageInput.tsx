import React, { ChangeEvent, useEffect, useLayoutEffect, useRef } from "react";
import { Attachment } from "xmtp-content-type-remote-attachment";
import { ArrowUpIcon, PaperClipIcon } from "@heroicons/react/outline";
import { IconButton } from "../IconButton/IconButton";
import { classNames } from "../../../../src/helpers";
import { useTranslation } from "react-i18next";
import { XCircleIcon } from "@heroicons/react/solid";
import { useAttachmentChange } from "../../../../src/hooks/useAttachmentChange";

interface InputProps {
  /**
   * What happens on a submit?
   */
  onSubmit?: (msg: string | Attachment) => Promise<void>;
  /**
   * Is the CTA button disabled?
   */
  isDisabled?: boolean;
  /**
   * Rerender component?
   */
  conversationId?: string;
  /**
   * Content attachment
   */
  attachment?: Attachment;
  /**
   * Function to set content attachment in state to send on submit
   */
  setAttachment: (attachment: Attachment | undefined) => void;
  /**
   * What to show in the input before an attachment is sent
   */
  attachmentPreview?: string;
  /**
   * Function to set the preview of the attachment in the input
   */
  setAttachmentPreview: (url: string | undefined) => void;
  /**
   * Function to set whether content is being dragged over the draggable area, including the message input
   */
  setIsDragActive: (status: boolean) => void;
}

export const MessageInput = ({
  onSubmit,
  isDisabled,
  conversationId,
  attachment,
  setAttachment,
  attachmentPreview,
  setAttachmentPreview,
  setIsDragActive,
}: InputProps) => {
  const { t } = useTranslation();
  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState("");

  const inputFile = useRef<HTMLInputElement | null>(null);

  const onChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setValue(event.target.value);

  const borderStyles =
    "border border-gray-300 focus-within:border-1 focus-within:border-indigo-600 rounded-tl-3xl rounded-bl-3xl rounded-tr-3xl";
  const textAreaStyles = `${
    textAreaRef?.current?.scrollHeight &&
    textAreaRef?.current?.scrollHeight <= 32
      ? "max-h-8"
      : "max-h-40"
  } min-h-8 outline-none border-none focus:ring-0 resize-none mx-2 p-1 w-full max-md:text-[16px] md:text-md text-gray-900`;

  useLayoutEffect(() => {
    const MIN_TEXTAREA_HEIGHT = 32;
    if (textAreaRef?.current?.value) {
      let currentScrollHeight = textAreaRef?.current.scrollHeight;
      textAreaRef.current.style.height = `${Math.max(
        currentScrollHeight,
        MIN_TEXTAREA_HEIGHT,
      )}px`;
    } else if (textAreaRef?.current) {
      textAreaRef.current.style.height = `${MIN_TEXTAREA_HEIGHT}px`;
    }
  }, [value]);

  useEffect(() => {
    textAreaRef.current?.focus();
    setValue("");
    setAttachmentPreview(undefined);
  }, [conversationId]);

  const onButtonClick = () => {
    // Current points to the mounted file input element
    inputFile?.current?.click();
  };

  const { error, onAttachmentChange } = useAttachmentChange({
    setAttachment,
    setAttachmentPreview,
    setIsDragActive,
  });

  return (
    <form className="flex items-center">
      <label htmlFor="chat" className="sr-only">
        {t("messages.message_field_prompt")}
      </label>
      <PaperClipIcon
        width={36}
        className="mb-4 ml-4 cursor-pointer bg-gray-100 p-2 rounded-full"
        onClick={onButtonClick}
      />
      <input
        type="file"
        id="file"
        ref={inputFile}
        onChange={onAttachmentChange}
        aria-label={t("aria_labels.filepicker") || "File picker"}
        hidden
      />
      <div
        className={classNames(
          "flex",
          "items-center",
          "max-h-300",
          "mx-4 my-2 mb-6",
          "bg-white",
          "relative",
          "no-scrollbar",
          "z-10",
          "p-1",
          "w-full",
          borderStyles,
        )}>
        {error ? (
          <p className="text-red-600 w-full m-1 ml-4">{error ? error : null}</p>
        ) : !attachmentPreview ? (
          //  Show regular text input if not in attachment view
          <textarea
            autoFocus
            id="chat"
            data-testid="message-input"
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (value || attachment) {
                  onSubmit?.(value);
                  setValue("");
                  setAttachment(undefined);
                  setAttachmentPreview(undefined);
                }
              }
            }}
            ref={textAreaRef}
            rows={1}
            className={textAreaStyles}
            placeholder={t("messages.message_field_prompt") || ""}
            value={value}
            disabled={isDisabled}
          />
        ) : (
          <div
            // Bottom padding required to preserve aspect ratio
            className="relative pb-[5%]">
            {attachment?.mimeType.includes("video") ? (
              <video width="320" height="240" controls autoPlay>
                <source src={attachmentPreview} type="video/mp4" />
                {t("attachments.video_messages_not_supported")}
              </video>
            ) : attachment?.mimeType.includes("application") ? (
              <object
                data={attachmentPreview}
                type="application/pdf"
                width="100%"
                height="500px">
                <p>{t("attachments.unable_to_display")}</p>
                <a href={attachmentPreview}>
                  {t("attachments.download_instead")}
                </a>
              </object>
            ) : (
              <img
                src={attachmentPreview || ""}
                alt={attachment?.filename}
                className="relative w-95/100 min-h-[100px] max-h-80 rounded-xl overflow-auto"
              />
            )}

            <XCircleIcon
              width={20}
              fill="gray"
              className="absolute top-0 right-0 cursor-pointer"
              onClick={() => setAttachmentPreview(undefined)}></XCircleIcon>
          </div>
        )}
        <div className="flex items-end absolute bottom-1.5 right-1">
          <IconButton
            testId="message-input-submit"
            variant="secondary"
            label={<ArrowUpIcon color="white" width="20" />}
            srText={t("aria_labels.submit_message") || ""}
            onClick={() => {
              if (value || attachment) {
                onSubmit?.((value as string) || (attachment as Attachment));
                setValue("");
                setAttachment(undefined);
                setAttachmentPreview(undefined);
                textAreaRef.current?.focus();
              }
            }}
            isDisabled={!(value || attachmentPreview) || isDisabled || !!error}
          />
        </div>
      </div>
    </form>
  );
};
