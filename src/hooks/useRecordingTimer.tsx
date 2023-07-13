import { useTranslation } from "react-i18next";
import { useStopwatch } from "react-timer-hook";
import { useEffect } from "react";
import { getRecordingValue } from "../helpers/recordingValue";

interface useRecordingTimerProps {
  startRecording: () => void;
  stopRecording: () => void;
  status: string;
}

export const useRecordingTimer = ({
  startRecording,
  stopRecording,
  status,
}: useRecordingTimerProps) => {
  const { t } = useTranslation();

  const { start, pause, minutes, seconds, reset } = useStopwatch({
    autoStart: false,
  });

  useEffect(() => {
    const handleKeyDown = () => {
      startRecording();
      start();
    };

    const handleKeyUp = () => {
      stopRecording();
      pause();
      reset();
    };

    // Cap recordings at 10 minutes
    if (minutes === 10) {
      stopRecording();
      pause();
    }

    const micEle = document.getElementById("mic");

    micEle?.addEventListener("mousedown", handleKeyDown);
    micEle?.addEventListener("mouseup", handleKeyUp);

    return function cleanup() {
      micEle?.removeEventListener("mousedown", handleKeyDown);
      micEle?.removeEventListener("mouseup", handleKeyUp);
    };
  }, [startRecording, stopRecording, start, pause, reset, minutes]);

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
