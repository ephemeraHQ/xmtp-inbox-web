import { useTranslation } from "react-i18next";
import * as reactTimerHookModule from "react-timer-hook";
import { useEffect } from "react";
import { getRecordingValue } from "../helpers/recordingValue";

// Temporary workaround to unbreak Reflame previews
// react-timer-hook exposes a minified UMD module which throws off
// Reflame's exports analysis for named exports conversion
const reactTimerHook =
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  (reactTimerHookModule.default as typeof reactTimerHookModule) ??
  reactTimerHookModule;

interface useRecordingTimerProps {
  startRecording: () => void;
  stopRecording: () => void;
  status: "recording" | "stopped";
}

export const useRecordingTimer = ({
  startRecording,
  stopRecording,
  status,
}: useRecordingTimerProps) => {
  const { t } = useTranslation();

  const { start, pause, minutes, seconds, reset } = reactTimerHook.useStopwatch(
    {
      autoStart: false,
    },
  );

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
