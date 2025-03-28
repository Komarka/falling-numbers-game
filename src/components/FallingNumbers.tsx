import { useState, useEffect } from 'react';
import { generateExplosion, generateRandomNumber } from '../utils';

export interface FallingNumber {
  id: number;
  value: string;
  x: number;
  y: number;
  color: string;
  speed: number;
  isExploding?: boolean;
}

interface Props {
  isPlaying: boolean;
  onNumberClick: (number: FallingNumber) => void;
}

export const FallingNumbers = ({ isPlaying, onNumberClick }: Props) => {
  const [fallingNumbers, setFallingNumbers] = useState<FallingNumber[]>([]);
  const [explosions, setExplosions] = useState<any[]>([]);

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setFallingNumbers((prev) => [...prev, generateRandomNumber()]);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleClick = (target: FallingNumber, event: React.MouseEvent) => {
    // Get cursor position from click event
    const { clientX, clientY } = event;

    setFallingNumbers((prev) =>
      prev.map((num) =>
        num.id === target.id ? { ...num, isExploding: true } : num
      )
    );

    // Generate explosion at click position
    setExplosions((prev) => [
      ...prev,
      ...generateExplosion(clientX, clientY, target.color),
    ]);

    // Remove the item after explosion
    setFallingNumbers((prev) => prev.filter((num) => num.id !== target.id));
    onNumberClick(target);
  };
  return (
    <div className="falling-numbers-container">
      {fallingNumbers.map((num) => (
        <div
          key={num.id}
          onClick={(event) => handleClick(num, event)}
          className="falling-number"
          style={{
            animationPlayState: isPlaying ? 'running' : 'paused',
            position: 'absolute',
            top: `${num.y}%`,
            left: `${num.x}%`,
            transition: isPlaying ? `top ${num.speed}s linear` : 'none',
            color: num.color,
            textShadow: `0 0 12px ${num.color}, 0 0 24px ${num.color}`,
            cursor: isPlaying ? 'pointer' : 'default',
            userSelect: 'none',
          }}
        >
          {num.value}
        </div>
      ))}

      {explosions.map((star) => (
        <div
          key={star.id}
          className="explosion"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
          }}
        />
      ))}
    </div>
  );
};
