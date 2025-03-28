import { FallingNumber } from './components/FallingNumbers';
import { Difficulty } from './consts';

const difficultyRanges = {
  [Difficulty.Easy]: { min: 30, max: 100 },
  [Difficulty.Medium]: { min: 80, max: 250 },
  [Difficulty.Hard]: { min: 150, max: 500 },
};

const operators = ['+', '-', '*', '/'];
const colors = ['#FF5733', '#33FF57', '#3357FF', '#F4D03F', '#9B59B6'];

export const generateTargetValue = (difficulty: Difficulty): number => {
  const range = difficultyRanges[difficulty];
  return Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
};

export const generateExplosion = (x: number, y: number, color: string) => {
  return Array.from({ length: 5 }).map((_, i) => ({
    id: `star-${Date.now()}-${i}`,
    x: x + (Math.random() - 0.5) * 50,
    y: y + (Math.random() - 0.5) * 50,
    size: Math.random() * 10 + 5,
    color,
  }));
};

export const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

export const generateRandomNumber = (): FallingNumber => {
  const operator = operators[Math.floor(Math.random() * operators.length)];
  const number = Math.floor(Math.random() * 10) + 1;
  return {
    id: Date.now(),
    value: `${operator} ${number}`,
    x: Math.random() * 100,
    y: -10 - Math.random() * 20,
    speed: Math.random() * 5 + 3,
    color: getRandomColor(),
  };
};
