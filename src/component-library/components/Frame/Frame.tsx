import { GhostButton } from "../GhostButton/GhostButton";
import type { FrameButton } from "../../../helpers/frameInfo";

type FrameProps = {
  image: string;
  title: string;
  textInput?: string;
  buttons: FrameButton[];
  handleClick: (
    buttonNumber: number,
    action: FrameButton["action"] | undefined,
  ) => Promise<void>;
  onTextInputChange: (value: string) => void;
  frameButtonUpdating: number;
  interactionsEnabled: boolean;
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
  <div className="px-4 md:px-8">
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
      {interactionsEnabled ? (
        buttons.map((button) => {
          if (!button) {
            return null;
          }
          const handlePress = () => {
            void handleClick(button.buttonIndex, button.action);
          };
          return (
            <GhostButton
              key={button.label}
              label={button.label}
              onClick={handlePress}
              isLoading={frameButtonUpdating === button.buttonIndex}
              isDisabled={frameButtonUpdating > 0}
            />
          );
        })
      ) : (
        <span>Frame interactions not supported</span>
      )}
    </div>
  </div>
);
