import { useState, useEffect } from 'react';
import { generateExplosion } from '../utils';

interface SpecialItem {
  id: number;
  type: 'freeze' | 'speedUp' | 'slowDown';
  x: number;
  y: number;
  speed: number;
  isExploding?: boolean;
  color: string;
}

interface Props {
  isPlaying: boolean;
  onSpecialItemClick: (type: 'freeze' | 'speedUp' | 'slowDown') => void;
}

export const SpecialFallingItems = ({
  isPlaying,
  onSpecialItemClick,
}: Props) => {
  const [specialItems, setSpecialItems] = useState<SpecialItem[]>([]);
  const [explosions, setExplosions] = useState<any[]>([]);

  useEffect(() => {
    if (!isPlaying) return;

    let interval: NodeJS.Timeout = null;

    if (isPlaying) {
      interval = setInterval(() => {
        const types: SpecialItem['type'][] = ['freeze', 'speedUp', 'slowDown'];
        const colors = ['grey', 'blue', 'red'];
        const randomIndex = Math.floor(Math.random() * types.length);
        const newItem: SpecialItem = {
          id: Date.now(),
          type: types[randomIndex],
          x: Math.random() * 100,
          y: -10 - Math.random() * 20,
          speed: Math.random() * 5 + 3,
          color: colors[randomIndex],
        };
        setSpecialItems((prev) => [...prev, newItem]);
      }, 10000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleClick = (target: SpecialItem, event: React.MouseEvent) => {
    onSpecialItemClick(target.type);

    setSpecialItems((prev) =>
      prev.map((item) =>
        item.id === target.id ? { ...target, isExploding: true } : item
      )
    );

    const { clientX, clientY } = event;

    setExplosions((prev) => [
      ...prev,
      ...generateExplosion(clientX, clientY, target.color),
    ]);

    setSpecialItems((prev) => prev.filter((item) => item.id !== target.id));
  };

  return (
    <div className="special-items-container">
      {specialItems.map((item) => (
        <div
          key={item.id}
          onClick={(event) => handleClick(item, event)}
          className={`special-item ${item.type}`}
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            animationPlayState: isPlaying ? 'running' : 'paused',
            transition: isPlaying ? `top ${item.speed}s linear` : 'none',
          }}
        >
          {item.type === 'freeze'
            ? '🧊'
            : item.type === 'speedUp'
            ? '⏩'
            : '⏰'}
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
