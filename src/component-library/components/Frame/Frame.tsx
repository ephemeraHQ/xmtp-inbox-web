import { GhostButton } from "../GhostButton/GhostButton";

type FrameProps = {
  info: {
    image: string;
    title: string;
    buttons: string[];
    postUrl: string;
  };
  handleClick: (buttonNumber: number) => Promise<void>;
  frameButtonUpdating: number;
};

export const Frame = ({
  info,
  handleClick,
  frameButtonUpdating,
}: FrameProps) => {
  const { buttons, image, title } = info;

  return (
    <>
      <img src={image} className="max-h-80 rounded-lg px-8" alt={title} />
      <div className="flex flex-col">
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
    </>
  );
};
