import React, { useState, useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import WorkTile from '../WorkTile';
import AnswerInput from '../AnswerInput';

export default function Game() {
  const { gameData, userStats, setUserStats } = useContext(GameContext);
  const [worksPlaying, setWorksPlaying] = useState(() =>
    gameData.works.map(() => ({ isPlaying: false }))
  );

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

    if (idx > -1 && update?.guessList[idx].isCorrect) {
      update.hasFinished = true;
      setUserStats(update);
    } else if (update.guessList.length === gameData.works.length) {
      update.hasFinished = true;
      setUserStats(update);
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
