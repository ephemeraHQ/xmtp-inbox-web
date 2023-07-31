import { useTranslation } from "react-i18next";
import { useStopwatch } from "react-timer-hook";
import { useEffect } from "react";
import type { StatusMessages } from "react-media-recorder-2";
import { getRecordingValue } from "../helpers/recordingValue";

interface useRecordingTimerProps {
  stopRecording: () => void;
  status: StatusMessages;
}

export const useRecordingTimer = ({
  stopRecording,
  status,
}: useRecordingTimerProps) => {
  const { t } = useTranslation();

  const { start, pause, minutes, seconds, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    // Cap recordings at 10 minutes
    if (minutes === 10) {
      stopRecording();
      pause();
    }
  }, [stopRecording, pause, minutes]);

  const recordingValue = getRecordingValue(
    status,
    minutes,
    seconds,
    t("attachments.recording"),
  );

  return {
    start,
    pause,
    reset,
    recordingValue,
  };
};
