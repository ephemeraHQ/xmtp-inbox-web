import type { FrameButton } from "../../../helpers/getFrameInfo";
import { GhostButton } from "../GhostButton/GhostButton";

type FrameProps = {
  image: string;
  title: string;
  buttons: FrameButton[];
  handleClick: (
    buttonNumber: number,
    action: FrameButton["action"],
  ) => Promise<void>;
  frameButtonUpdating: number;
};

export const Frame = ({
  image,
  title,
  buttons,
  handleClick,
  frameButtonUpdating,
}: FrameProps) => (
  <div className="px-4 md:px-8">
    <img src={image} className="max-h-80 rounded-lg" alt={title} />
    <div className="flex flex-col items-center">
      {buttons?.map((button, index) => {
        if (!button) {
          return null;
        }
        const handlePress = () => {
          void handleClick(index + 1, button.action);
        };
        return (
          <GhostButton
            key={button.text}
            label={button.text}
            onClick={handlePress}
            isLoading={frameButtonUpdating === index + 1}
            isDisabled={frameButtonUpdating > 0}
          />
        );
      })}
    </div>
  </div>
);
