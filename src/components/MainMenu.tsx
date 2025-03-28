import React, { useMemo } from 'react';
import { Difficulty } from '../consts';
import Logo from '../assets/logo.webp';

interface MainMenuProps {
  onStartGame: (name: string, difficulty: string) => void;
  userName: string;
  difficulty: string;
  setName: (name: string) => void;
  setDifficulty: (difficulty: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({
  onStartGame,
  difficulty,
  setDifficulty,
  setName,
  userName,
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleDifficultyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDifficulty(e.target.value);
  };

  const canStartGame = useMemo(() => {
    return userName && difficulty;
  }, [userName, difficulty]);

  const handleStartGame = () => {
    if (canStartGame) {
      onStartGame(userName, difficulty);
    }
  };

  return (
    <div className="main-menu">
      <img
        src={Logo}
        width={200}
        height={200}
        alt="Game Logo"
        className="game-logo"
      />{' '}
      {/* Логотип */}
      <h1>Falling Numbers</h1>
      <div>
        <label htmlFor="name">Enter your name: </label>
        <input
          type="text"
          id="name"
          value={userName}
          onChange={handleNameChange}
          placeholder="Your Name"
        />
      </div>
      <div>
        <label htmlFor="difficulty">Select Difficulty: </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={handleDifficultyChange}
        >
          <option value={Difficulty.Easy}>Easy</option>
          <option value={Difficulty.Medium}>Medium</option>
          <option value={Difficulty.Hard}>Hard</option>
        </select>
      </div>
      <button disabled={!canStartGame} onClick={handleStartGame}>
        Start Game
      </button>
    </div>
  );
};

export default MainMenu;
