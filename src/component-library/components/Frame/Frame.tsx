import { ArrowCircleRightIcon } from "@heroicons/react/outline";
import type {
  OpenFrameButton,
  OpenFrameResult,
} from "@open-frames/proxy-client";
import { classNames } from "../../../helpers";
import { ButtonLoader } from "../Loaders/ButtonLoader";

type FrameProps = {
  image: string;
  title: string;
  textInput?: string;
  buttons: OpenFrameResult["buttons"];
  handleClick: (
    buttonNumber: number,
    action?: OpenFrameButton["action"],
  ) => Promise<void>;
  onTextInputChange: (value: string) => void;
  frameButtonUpdating: number;
  interactionsEnabled: boolean;
};

const FrameButtonContainer = ({
  label,
  isExternalLink,
  isFullWidth,
  isLoading,
  isDisabled,
  testId = "",
  clickHandler,
}: {
  testId?: string;
  label: string;
  isExternalLink: boolean;
  isFullWidth: boolean;
  isLoading: boolean;
  isDisabled: boolean;
  clickHandler: () => void;
}) => {
  const columnWidth = isFullWidth ? "col-span-2" : "col-span-1";

  const icon = isExternalLink ? <ArrowCircleRightIcon width={16} /> : null;
  return (
    <button
      type="button"
      onClick={clickHandler}
      data-testid={testId}
      disabled={isDisabled}
      className={classNames(
        columnWidth,
        // Font color
        "text-indigo-600 hover:text-indigo-800 focus:outline-none focus-visible:ring focus-visible:ring-indigo-800",
        // Font size
        "text-sm p-0",
        // "font-bold",
        // Min width
        `min-w-[20%]`,
        // Background
        "white",
        // Border settings
        "border",
        "box-border",
        "border-b-100 hover:border-b-300",
        "rounded-lg",
        // Layout
        "flex",
        "items-center",
        "justify-center",
        "h-fit",
        "p-2",
        // Transition
        "transition duration-150 ease-in-out", // Quick transition for hover state
      )}
      aria-label={label}>
      <div className="flex justify-center items-center h-fit space-x-2">
        <div>{label}</div>
        {isLoading ? <ButtonLoader color="primary" size="small" /> : icon}
      </div>
    </button>
  );
};

type ButtonsContainerProps = Pick<
  FrameProps,
  "frameButtonUpdating" | "handleClick"
> & {
  buttons: NonNullable<OpenFrameResult["buttons"]>;
};

const ButtonsContainer = ({
  frameButtonUpdating,
  buttons,
  handleClick,
}: ButtonsContainerProps) => {
  if (Object.keys(buttons).length < 1 || Object.keys(buttons).length > 4) {
    return null;
  }
  // If there is only one button make it full-width
  const gridColumns =
    Object.keys(buttons).length === 1 ? "grid-cols-1" : "grid-cols-2";
  return (
    <div className={`grid ${gridColumns} gap-2 w-full pt-2`}>
      {Object.keys(buttons).map((key, index) => {
        const button = buttons[key];
        const buttonIndex = parseInt(key, 10);
        const clickHandler = () => {
          void handleClick(buttonIndex, button.action);
        };
        const isFullWidth = Object.keys(buttons).length === 3 && index === 2;
        return (
          <FrameButtonContainer
            key={button.label}
            isFullWidth={isFullWidth}
            label={button.label}
            isExternalLink={["post_redirect", "link"].includes(
              button.action || "",
            )}
            isLoading={frameButtonUpdating === buttonIndex}
            isDisabled={frameButtonUpdating > 0}
            clickHandler={clickHandler}
          />
        );
      })}
    </div>
  );
};

export const Frame = ({
  image,
  title,
  buttons,
  textInput,
  handleClick,
  onTextInputChange,
  frameButtonUpdating,
  interactionsEnabled,
}: FrameProps) => (
  <div className="px-4 md:px-8 p-1">
    <img src={image} className="max-h-80 rounded-lg" alt={title} />
    {!!textInput && interactionsEnabled && (
      <input
        type="text"
        className="w-full mt-4 mb-4 h-10 px-3 border rounded-md"
        spellCheck="false"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        onChange={(e) =>
          onTextInputChange((e.target as HTMLInputElement).value)
        }
        placeholder={textInput}
      />
    )}
    <div className="flex flex-col items-center">
      {interactionsEnabled && buttons ? (
        <ButtonsContainer
          frameButtonUpdating={frameButtonUpdating}
          handleClick={handleClick}
          buttons={buttons}
        />
      ) : (
        <span>Frame interactions not supported</span>
      )}
    </div>
  </div>
);
