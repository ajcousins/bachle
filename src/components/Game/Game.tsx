import React, { useEffect, useState } from 'react';
import WorkTile from '../WorkTile';
import AnswerInput from '../AnswerInput';

interface IProps {
  userStats: any;
  gameData: any;
  handleReset: any;
}

export default function Game({
  userStats,
  gameData,
  handleReset
}: IProps) {
  const [worksPlaying, setWorksPlaying] = useState(() =>
    gameData.gameData.works.map(() => ({ isPlaying: false }))
  );

  const updateGuessList = (guess: any) => {
    if (!userStats.userStats) return;
    const update = { ...userStats.userStats };
    update.guessList.push(guess);
    userStats.setUserStats(update);
    checkGameover();
  };

  const checkGameover = () => {
    if (!userStats) return;
    const update = { ...userStats.userStats };
    const idx = update.guessList.length - 1;

    if (idx > -1 && update?.guessList[idx].isCorrect) {
      console.log('CORRECT!');
      update.hasFinished = true;
      userStats.setUserStats(update);
    } else if (update.guessList.length === gameData.gameData.works.length) {
      console.log('GAMEOVER!');
      update.hasFinished = true;
      userStats.setUserStats(update);
    }
  };

  const handleAnswer = (answer: string, skipped?: boolean) => {
    const guess = {
      answer: answer,
      isCorrect: false,
      isSkipped: false,
    };

    if (answer === gameData.gameData.answer) guess.isCorrect = true;
    if (skipped) guess.isSkipped = true;
    updateGuessList(guess);
  };

  return (
    <>
      {gameData.gameData.works.map((work: any, idx: number) => {
        return (
          <WorkTile
            key={idx}
            work={work}
            idx={idx}
            userStats={userStats.userStats}
            worksPlaying={worksPlaying}
            setWorksPlaying={setWorksPlaying}
          />
        );
      })}
      <AnswerInput
        handleAnswer={handleAnswer}
        playingControl={{ worksPlaying, setWorksPlaying }}
        handleReset={handleReset}
      />
    </>
  );
}
