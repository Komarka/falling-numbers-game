import { useEffect, useState } from 'react';
import { generateTargetValue } from '../utils';
import { Difficulty } from '../consts';
import { GameInfoBanner } from './GameInfoBanner';
import { FallingNumber, FallingNumbers } from './FallingNumbers';
import { SpecialFallingItems } from './SpecialFallingItems';

export const CONTDOWN = 60;

interface Props {
  userName: string;
  difficulty: string;
}

export const GameArea = ({ userName, difficulty }: Props) => {
  const [currentPoints, setCurrentPoints] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState(CONTDOWN);

  const [isPlaying, setIsPlaying] = useState(false);

  const [targetPoints, setTargetPoints] = useState<number>(() =>
    generateTargetValue(difficulty as Difficulty)
  );

  useEffect(() => {
    setIsPlaying(true);
  }, []);

  const onRestart = () => {
    setCurrentPoints(0);
    setTargetPoints(generateTargetValue(difficulty as Difficulty));
  };

  const onNumberClick = (target: FallingNumber) => {
    const [operator, num] = target.value.split(' '); // Extract operator and number
    const value = parseInt(num, 10); // Convert number to integer

    if (!isNaN(value)) {
      setCurrentPoints((prevPoints) => {
        switch (operator) {
          case '+':
            return Math.round(prevPoints + value);
          case '-':
            return Math.round(prevPoints - value);
          case '*':
            return Math.round(prevPoints * value);
          case '/':
            return Math.round(prevPoints / value);
          default:
            return prevPoints;
        }
      });
    }
  };

  const onSpecialItemClick = (type: 'freeze' | 'speedUp' | 'slowDown') => {
    if (type === 'freeze') {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 3000); // Остановка на 3 секунды
    } else if (type === 'speedUp') {
      setTimeLeft((prev) => prev - 5); // Ускорение на 5 секунд
    } else if (type === 'slowDown') {
      setTimeLeft((prev) => prev + 5); // Замедление на 3 секунды
    }
  };

  return (
    <div style={{ overflow: 'hidden', width: '100vw', height: '100vh' }}>
      <SpecialFallingItems
        isPlaying={isPlaying}
        onSpecialItemClick={onSpecialItemClick}
      />
      <FallingNumbers onNumberClick={onNumberClick} isPlaying={isPlaying} />
      <GameInfoBanner
        timeLeft={timeLeft}
        setTimeLeft={setTimeLeft}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        userName={userName}
        onRestart={onRestart}
        currentPoints={currentPoints}
        targetPoints={targetPoints}
      />
    </div>
  );
};
