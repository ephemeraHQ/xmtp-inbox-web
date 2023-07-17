import type { Attachment } from "@xmtp/content-type-remote-attachment";
import { useReactMediaRecorder } from "react-media-recorder-2";
import { useTranslation } from "react-i18next";
import { ATTACHMENT_ERRORS } from "../helpers";
import { humanFileSize } from "../helpers/attachments";
import { useXmtpStore } from "../store/xmtp";

interface useVoiceRecordingProps {
  setAttachment: (attachment: Attachment | undefined) => void;
  setAttachmentPreview: (url: string | undefined) => void;
}

const fileType = "audio/wav";

export const useVoiceRecording = ({
  setAttachment,
  setAttachmentPreview,
}: useVoiceRecordingProps) => {
  const { t } = useTranslation();

  const setAttachmentError = useXmtpStore((state) => state.setAttachmentError);

  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({
      audio: true,
      onStop: (blobUrl, blob) => {
        setAttachmentPreview(blobUrl);
        const file = new File([blob], "audio", { type: fileType });

        if (humanFileSize(file.size) === ATTACHMENT_ERRORS.FILE_TOO_LARGE) {
          setAttachmentError(t("status_messaging.file_too_large"));
        }

        const fr = new FileReader();
        fr.readAsArrayBuffer(file);

        fr.addEventListener("load", () => {
          const result = fr.result as ArrayBuffer;

          if (!(result instanceof ArrayBuffer)) {
            return;
          }

          const newAttachment = {
            filename: "VoiceRecording.wav",
            mimeType: fileType,
            data: new Uint8Array(result),
          };

          setAttachment(newAttachment);
        });
      },
      askPermissionOnMount: false,
    });

  return {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  };
};
