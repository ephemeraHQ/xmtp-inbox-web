/*
 * Returns a formatted recording value string based on status and timer values
 *
 * @param status - The current recording status, 'recording' or 'stopped'
 * @param minutes - The current recording timer minutes
 * @param seconds - The current recording timer seconds
 * @param text - The text to display before the timer value
 *
 * @returns Formatted string with text and timer if status is 'recording',
 *          null otherwise
 *
 * Example:
 * ```
 * const value = getRecordingValue('recording', 5, 7, 'Recording');
 * // value = 'Recording (05:07)'
 * ```
 */

export const getRecordingValue = (
  status: "recording" | "stopped",
  minutes: number,
  seconds: number,
  text: string,
): string | null =>
  status === "recording"
    ? `${text} (${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
      }${seconds})`
    : null;
