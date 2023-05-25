import React, {
  ChangeEvent,
  useEffect,
  useState,
  useLayoutEffect,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";
import { Attachment } from "xmtp-content-type-remote-attachment";
import { ArrowUpIcon, PaperClipIcon } from "@heroicons/react/outline";
import { IconButton } from "../IconButton/IconButton";
import { classNames } from "../../../helpers";
import { useTranslation } from "react-i18next";
import { XCircleIcon } from "@heroicons/react/solid";

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
   * Function to set content attachment in state for the message input
   */
  setAttachment: Dispatch<SetStateAction<any>>;
}

const imageTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

export const MessageInput = ({
  onSubmit,
  isDisabled,
  conversationId,
  attachment,
  setAttachment,
}: InputProps) => {
  const { t } = useTranslation();
  let textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = React.useState("");

  const inputFile = useRef<HTMLInputElement | null>(null);
  const [attachmentPreview, setAttachmentPreview]: [
    string | undefined,
    Function,
  ] = useState();
  const [error, setError]: [string, Function] = useState("");

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

  const onAttachmentChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setError(undefined);
    if (e.target?.files?.length) {
      const file = e.target.files[0];

      // Currently images are the only attachment type supported
      if (!imageTypes.includes(file.type)) {
        setError("File must be of valid file format");
        return;
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", async () => {
        const data = fileReader.result;

        if (!(data instanceof ArrayBuffer)) {
          return;
        }

        const imageAttachment: Attachment = {
          filename: file.name,
          mimeType: file.type,
          data: new Uint8Array(data),
        };

        setAttachmentPreview(
          URL.createObjectURL(
            new Blob([Buffer.from(data)], {
              type: imageAttachment.mimeType,
            }),
          ),
        );

        setAttachment(imageAttachment);
      });

      fileReader.readAsArrayBuffer(file);
      // resets the value so the same image can be re-uploaded after a deletion
      e.target.value = "";
    } else {
      setAttachment(undefined);
    }
  };

  return (
    <form className="flex items-center px-1">
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
        onInput={onAttachmentChange}
        className="hidden"></input>
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
            style={{
              position: "relative",
              // Required to preserve aspect ratio
              paddingBottom: "5%",
            }}>
            <img
              src={attachmentPreview || ""}
              alt={"Add filename here"}
              style={{
                position: "relative",
                width: "95%",
                minHeight: "100px",
                maxHeight: "300px",
                borderRadius: "12px",
                overflow: "auto",
              }}></img>
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
