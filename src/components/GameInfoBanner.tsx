import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { CONTDOWN } from './GameArea';

interface Props {
  targetPoints: number;
  currentPoints: number;
  userName: string;
  onRestart: () => void;
  isPlaying: boolean;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}

export const GameInfoBanner = ({
  currentPoints,
  targetPoints,
  userName,
  onRestart,
  isPlaying,
  setIsPlaying,
  setTimeLeft,
  timeLeft,
}: Props) => {
  const [showTimeOutModal, setShowTimeOutModal] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setShowTimeOutModal(true);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }

    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  useEffect(() => {
    const isWin = currentPoints === targetPoints;
    if (isWin) {
      setShowWinModal(true);
      setIsPlaying(false);
    }
  }, [currentPoints, targetPoints]);

  const handleRestart = () => {
    setTimeLeft(CONTDOWN);
    setShowTimeOutModal(false);
    setIsPlaying(true);
    setShowWinModal(false);
    onRestart();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / CONTDOWN);
    const secs =
      seconds < 60 ? seconds % CONTDOWN || seconds : seconds % CONTDOWN;
    return `${seconds < 60 ? '0' : mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <>
      <div className="info-banner">
        <div className="info-banner__lef">
          <span className="timer-display">{formatTime(timeLeft)}</span>
        </div>

        <div className="info-banner__right">
          <span className="value-display">
            {currentPoints}/{targetPoints}
          </span>
        </div>
      </div>

      {showWinModal && (
        <div className="timeout-modal-overlay">
          <div className="timeout-modal">
            <h2>Congratulations, {userName}!</h2>
            <p>You caught all the stars!</p>
            <button className="modal-restart-button" onClick={handleRestart}>
              Play Again
            </button>
          </div>
        </div>
      )}

      {showTimeOutModal && (
        <div className="timeout-modal-overlay">
          <div className="timeout-modal">
            <h2>Time's Up, {userName}!</h2>
            <p>Next time you will catch more stars!</p>
            <div className="modal-points">
              You caught: {currentPoints}/{targetPoints} stars
            </div>
            <button className="modal-restart-button" onClick={handleRestart}>
              Play Again
            </button>
          </div>
        </div>
      )}
    </>
  );
};
