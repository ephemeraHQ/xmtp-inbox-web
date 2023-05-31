import { ChangeEvent, useCallback, useState } from "react";
import { Attachment } from "xmtp-content-type-remote-attachment";

export const imageTypes = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

interface useAttachmentChangeProps {
  setAttachment: Function;
  setAttachmentPreview: Function;
  setIsDragActive: Function;
}

export const useAttachmentChange = ({
  setAttachment,
  setAttachmentPreview,
  setIsDragActive,
}: useAttachmentChangeProps) => {
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
        // not needed for drag events
        (e as ChangeEvent<HTMLInputElement>).target.value = "";
      } else {
        setAttachment?.(undefined);
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
