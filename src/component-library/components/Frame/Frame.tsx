import { GhostButton } from "../GhostButton/GhostButton";

type FrameProps = {
  image: string;
  title: string;
  buttons: string[];
  handleClick: (buttonNumber: number) => Promise<void>;
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
          void handleClick(index + 1);
        };
        return (
          <GhostButton
            key={button}
            label={button}
            onClick={handlePress}
            isLoading={frameButtonUpdating === index + 1}
            isDisabled={frameButtonUpdating > 0}
          />
        );
      })}
    </div>
  </div>
);
