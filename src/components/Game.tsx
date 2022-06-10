import React, { useEffect, useState } from 'react';
import WorkTile from './WorkTile';
import AnswerInput from './AnswerInput';

const GAMEDAY_ID = 5;

const gameData: any = {
  id: 1,
  answer: 'Johann Sebastian Bach',
  works: [
    {
      title: 'Matthäus Passion (BWV 244) - Erbarme Dich',
      url: 'https://soundcloud.com/pensatore/002-johann-sebastian-bach-matthaus-passion-bwv-244-erbarme-dich?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      startTime: 30,
      duration: 5,
    },
    {
      title: '"Chaconne" from Partita in D Minor for Solo Violin - Tim Fain',
      url: 'https://soundcloud.com/onbeing/tim-fain-chaconne-from-partita-in-d-minor-for-solo-violin-by-johann-sebastian-bach?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      startTime: 30,
      duration: 7.5,
    },
    {
      title: 'Suite for Cello solo no 1 in G major-Prelude',
      url: 'https://soundcloud.com/necmusic/bach-suite-for-cello-solo-no-1?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      startTime: 3,
      duration: 10,
    },
  ],
};

export default function Game() {
  const [userStats, setUserStats] = useState<Stat | undefined>();
  const [worksPlaying, setWorksPlaying] = useState(() =>
    gameData.works.map(() => ({ isPlaying: false }))
  );

  useEffect(() => {
    console.log('worksPlaying:', worksPlaying);
  }, [worksPlaying]);

  // On app first load: Check local storage. Set userStats.
  useEffect(() => {
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
    console.log('worksPlaying:', worksPlaying);
    // eslint-disable-next-line
  }, []);

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

  return (
    <div>
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
      <AnswerInput handleAnswer={handleAnswer} />
    </div>
  );
}
