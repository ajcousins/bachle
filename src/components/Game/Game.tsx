import React, { useState, useContext, useEffect } from 'react';
import { GameContext } from '../../context/GameContext';
import WorkTile from '../WorkTile';
import AnswerInput from '../AnswerInput';
import { generateUserId } from '../../helpers/dateHelpers';
import postStats from '../../api/postStats';

export default function Game() {
  const { gameData, userStats, setUserStats } = useContext(GameContext);
  const [worksPlaying, setWorksPlaying] = useState(() =>
    gameData.works.map(() => ({ isPlaying: false }))
  );
  const [userId, setUserId] = useState('');

  // handle userId
  useEffect(() => {
    const id = localStorage.getItem('userId');
    if (!id) {
      const newId = generateUserId();
      localStorage.setItem('userId', newId);
      setUserId(newId);
      return;
    }
    setUserId(id);
  }, []);

  const updateGuessList = (guess: any) => {
    if (!userStats) return;
    const update = { ...userStats };
    update.guessList.push(guess);
    setUserStats(update);
    checkGameover();
  };

  const checkGameover = () => {
    if (!userStats) return;
    const update = { ...userStats };
    const idx = update.guessList.length - 1;

    if (
      (idx > -1 && update?.guessList[idx].isCorrect) ||
      update.guessList.length === gameData.works.length
    ) {
      update.hasFinished = true;
      setUserStats(update);
      console.log('Game finished. Post results to backend.', update);
      postStats(update, userId);
    }
  };

  const handleAnswer = (answer: string, skipped?: boolean) => {
    const guess = {
      answer: answer,
      isCorrect: false,
      isSkipped: false,
    };

    if (answer === gameData.answer) guess.isCorrect = true;
    if (skipped) guess.isSkipped = true;
    updateGuessList(guess);
  };

  return (
    <>
      {gameData.works.map((work: any, idx: number) => {
        return (
          <WorkTile
            key={idx}
            work={work}
            idx={idx}
            worksPlaying={worksPlaying}
            setWorksPlaying={setWorksPlaying}
          />
        );
      })}
      <AnswerInput
        handleAnswer={handleAnswer}
        playingControl={{ worksPlaying, setWorksPlaying }}
      />
    </>
  );
}
