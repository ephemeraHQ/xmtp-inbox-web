import { ChangeEvent, useCallback, useState } from "react";
import { Attachment } from "xmtp-content-type-remote-attachment";
import { contentTypes, humanFileSize } from "../helpers/attachments";
import { ATTACHMENT_ERRORS } from "../helpers";
import { useTranslation } from "react-i18next";

export const typeLookup: Record<string, contentTypes> = {
  jpg: "image",
  jpeg: "image",
  png: "image",
  gif: "image",
  webp: "image",
  quicktime: "video",
  mov: "video",
  mp4: "video",
  pdf: "application",
  doc: "application",
};

interface useAttachmentChangeProps {
  setAttachment: (attachment: Attachment | undefined) => void;
  setAttachmentPreview: (url: string | undefined) => void;
  setIsDragActive: (status: boolean) => void;
}

export const useAttachmentChange = ({
  setAttachment,
  setAttachmentPreview,
  setIsDragActive,
}: useAttachmentChangeProps) => {
  const { t } = useTranslation();

  const [error, setError]: [string, Function] = useState("");

  const onAttachmentChange = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement> | React.DragEvent<HTMLDivElement>,
    ) => {
      e.preventDefault();
      e.stopPropagation();

      setError(undefined);

      // Both types needed for drag events or upload events
      const target = (e as ChangeEvent<HTMLInputElement>)?.target.files
        ? (e as ChangeEvent<HTMLInputElement>)?.target
        : (e as React.DragEvent<HTMLDivElement>)?.dataTransfer.files
        ? (e as React.DragEvent<HTMLDivElement>).dataTransfer
        : undefined;

      if (target?.files?.length && setAttachment) {
        const file = target.files[0];

        const [type, suffix] = file.type?.split?.("/");
        if (
          !typeLookup[suffix] ||
          `${typeLookup[suffix]}/${suffix}` !== file.type
        ) {
          setError(t("status_messaging.file_invalid_format"));
          setIsDragActive(false);
          return;
        }
        // Displays error if > 5 MB
        if (humanFileSize(file.size) === ATTACHMENT_ERRORS.FILE_TOO_LARGE) {
          setError(t("status_messaging.file_too_large"));
          setIsDragActive(false);
          return;
        }
        const fileReader = new FileReader();
        fileReader.addEventListener("load", async () => {
          const data = fileReader.result;

          if (!(data instanceof ArrayBuffer)) {
            return;
          }

          const attachment: Attachment = {
            filename: file.name,
            mimeType: file.type,
            data: new Uint8Array(data),
          };

          setAttachmentPreview(
            URL.createObjectURL(
              new Blob([Buffer.from(data)], {
                type: attachment.mimeType,
              }),
            ),
          );

          setAttachment(attachment);
        });

        fileReader.readAsArrayBuffer(file);
        // resets the value so the same image can be re-uploaded after a deletion
        // not needed for drag events
        (e as ChangeEvent<HTMLInputElement>).target.value = "";
      } else {
        setAttachment(undefined);
      }
      setIsDragActive(false);
    },
    [setAttachment, setAttachmentPreview, setIsDragActive],
  );
  return {
    error,
    onAttachmentChange,
  };
};
