import { useState, useEffect } from 'react';
import { generateExplosion } from '../utils';
import FrozenImage from '../assets/freeze_time.png';
import AddTimeImage  from '../assets/add_time.png';
import SpeedUpImage from '../assets/speed_up.png'




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

  const imageRecordFromType = {
    'freeze': FrozenImage,
    'speedUp': SpeedUpImage,
    'slowDown': AddTimeImage
  }

  useEffect(() => {
    if (!isPlaying) return;

    let interval: any = null;

    if (isPlaying) {
      interval = setInterval(() => {
        const types: SpecialItem['type'][] = ['freeze', 'speedUp', 'slowDown'];
        const colors = {'freeze': 'blue', 'slowDown': 'blue', 'speedUp' :'red'};
        const randomIndex = Math.floor(Math.random() * types.length);
        const type = types[randomIndex];
        const newItem: SpecialItem = {
          id: Date.now(),
          type: type,
          x: Math.random() * 100,
          y: -10 - Math.random() * 20,
          speed: Math.random() * 5 + 3,
          color: colors[type],
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
          {<img
        src={imageRecordFromType[item.type]}
        width={80}
        height={80}
        alt="Game Logo"
        className="game-logo"
      />}
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
