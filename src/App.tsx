import { useState } from 'react';
import './App.css';
import MainMenu from './components/MainMenu';
import { Difficulty } from './consts';
import { GameArea } from './components/GameArea';

export const App = () => {
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [difficulty, setDifficulty] = useState<string>(Difficulty.Easy);

  const onStartGame = (name: string, difficulty: string) => {
    setUserName(name);
    setDifficulty(difficulty);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <MainMenu
        userName={userName}
        setDifficulty={setDifficulty}
        setName={setUserName}
        difficulty={difficulty}
        onStartGame={onStartGame}
      />
    );
  }

  return (
    <div className="App">
      <GameArea userName={userName} difficulty={difficulty} />
    </div>
  );
};
