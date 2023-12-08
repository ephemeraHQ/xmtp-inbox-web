import { useState, useEffect } from "react";
import "./SnowEffect.css";

interface snowflakeStyles {
  left: string;
  opacity: number;
  animationDuration: string;
  animationDelay: string;
}

const SnowEffect = ({ attachedMessageId }: { attachedMessageId: string }) => {
  const [snowflakes, setSnowflakes] = useState<snowflakeStyles[]>([]);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Snowflake objects
    const newSnowflakes: Array<snowflakeStyles> = [];
    for (let i = 0; i < 150; i++) {
      newSnowflakes.push({
        left: `${Math.random() * 100}vw`,
        opacity: Math.random(),
        animationDuration: `${10 + Math.random() * 20}s`,
        animationDelay: `-${Math.random() * 20}s`,
      });
      document.body.style.pointerEvents = "none";
    }
    setSnowflakes(newSnowflakes);

    const timeout = setTimeout(() => {
      setIsVisible(false);
      document.body.style.pointerEvents = "auto";
      localStorage.setItem(attachedMessageId, "SNOW");
    }, 3000);

    // // Clear the timeout if the component unmounts
    return () => clearTimeout(timeout);
  }, [attachedMessageId]);

  return isVisible ? (
    <div className="snowContainer">
      {snowflakes.map((snowflake: snowflakeStyles, index) => (
        <div
          key={index}
          className="snow"
          style={{
            left: snowflake.left,
            opacity: snowflake.opacity,
            animationDuration: snowflake.animationDuration,
            animationDelay: snowflake.animationDelay,
          }}
        />
      ))}
    </div>
  ) : null;
};

export default SnowEffect;
