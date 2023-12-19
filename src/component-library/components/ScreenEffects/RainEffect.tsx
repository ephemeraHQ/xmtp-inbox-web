import { useEffect, useState } from "react";
import "./RainEffect.css";

interface logoStyles {
  left: string;
  opacity: number;
  animationDuration: string;
  animationDelay: string;
}

const RainEffect = ({ attachedMessageId }: { attachedMessageId: string }) => {
  const [logos, setLogos] = useState<logoStyles[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Create 75 logo objects with randomized styles
    const newLogos = [];
    for (let i = 0; i < 75; i++) {
      newLogos.push({
        left: `${Math.random() * 100}vw`,
        opacity: Math.random(),
        animationDuration: `${10 + Math.random() * 20}s`,
        animationDelay: `-${Math.random() * 20}s`,
      });
      document.body.style.pointerEvents = "none";
    }
    setLogos(newLogos);

    // Set a timeout to hide the container and change effect
    const timeout = setTimeout(() => {
      setIsVisible(false);
      document.body.style.pointerEvents = "auto";
      localStorage.setItem(attachedMessageId, "RAIN");
    }, 3000);

    // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [attachedMessageId]);

  return isVisible ? (
    <div className="rainContainer">
      {logos.map((logo, index) => (
        <div
          key={index}
          className="logo"
          style={{
            left: logo.left,
            opacity: logo.opacity,
            animationDuration: logo.animationDuration,
            animationDelay: logo.animationDelay,
          }}
        />
      ))}
    </div>
  ) : null;
};

export default RainEffect;
