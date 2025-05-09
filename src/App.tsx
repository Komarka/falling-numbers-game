import { useEffect, useState } from 'react';
import './App.css';
import { Difficulty } from './consts';
import { GameArea } from './components/GameArea';

export const App = () => {
  const [userName, setUserName] = useState<string>('');

  

    useEffect(() => {
      const tg = window.Telegram?.WebApp;
      tg?.ready();
    
      const user = tg?.initDataUnsafe?.user;
      if (user) {
        setUserName(user.username!);
      }
    }, []);


  return (
    <div className="App">
      <GameArea userName={userName} difficulty={Difficulty.Easy} />
    </div>
  );
};
