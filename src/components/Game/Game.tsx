import React, { useEffect, useState } from 'react';
import WorkTile from '../WorkTile';
import AnswerInput from '../AnswerInput';
import { fetchData, condensedDate } from './gameHelpers';
import { defaultGame } from './data';

// const GAMEDAY_ID = condensedDate();
const GAMEDAY_ID = '220613';
console.log('Date:', GAMEDAY_ID);

export default function Game() {
  const [userStats, setUserStats] = useState<Stat | undefined>();
  const [gameData, setGameData] = useState<Game>(defaultGame);
  const [worksPlaying, setWorksPlaying] = useState(() =>
    gameData.works.map(() => ({ isPlaying: false }))
  );
  const [resetState, setResetState] = useState(0);

  // On app first load: Fetch game data. Check local storage. Set userStats.
  useEffect(() => {

    // Fetch game data & update gameData state.
    fetchData(GAMEDAY_ID, setGameData);

    // Local Storage
    const storageString = localStorage.getItem('userStats');

    const freshStat = {
      id: GAMEDAY_ID,
      guessList: [],
      hasFinished: false,
      hasStarted: false,
    };

    let history = [];

    if (!storageString) {
      history.push(freshStat);
      localStorage.setItem('userStats', JSON.stringify(history));
    } else {
      history = JSON.parse(storageString);
    }

    // does current gameday_id exist in savedArray?
    const idx = history.findIndex((stat: any) => stat.id === GAMEDAY_ID);
    if (idx === -1) {
      history.push(freshStat);
      localStorage.setItem('userStats', JSON.stringify(history));
    }
    setUserStats(history[idx]);
    // eslint-disable-next-line
  }, [resetState]);

  // update localstorage whenever userStats state updates
  useEffect(() => {
    if (!userStats) return;
    const storageString = localStorage.getItem('userStats');
    if (!storageString) return;
    const history = JSON.parse(storageString);
    const idx = history.findIndex((stat: any) => stat.id === GAMEDAY_ID);
    if (idx === -1) return;
    history.splice(idx, 1, userStats);
    localStorage.setItem('userStats', JSON.stringify(history));
  }, [userStats]);

  const updateGuessList = (guess: any) => {
    if (!userStats) return;
    const update = { ...userStats };
    update.guessList.push(guess);
    setUserStats(update);
  };

  const handleAnswer = (answer: string, skipped?: boolean) => {
    const guess = {
      answer: answer,
      isCorrect: false,
      isSkipped: false,
    };

    if (answer === gameData.answer) {
      guess.isCorrect = true;
    }

    if (skipped) {
      guess.isSkipped = true;
    }

    updateGuessList(guess);
  };

  const handleReset = () => {
    localStorage.removeItem('userStats');
    setUserStats(undefined);
    setResetState(resetState + 1);
  };

  return (
    <>
      {gameData.works.map((work: any, idx: number) => {
        return (
          <WorkTile
            key={idx}
            work={work}
            idx={idx}
            userStats={userStats}
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
