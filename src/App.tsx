import React, { useEffect, useState } from 'react';
import './App.scss';
import WorkTile from './components/WorkTile';
import AnswerInput from './components/AnswerInput';

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

function App() {
  const [userStats, setUserStats] = useState<Stat | undefined>();

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

  const handleUpdate = () => {
    console.log('handle update');
    if (!userStats) return;
    const update = { ...userStats };

    update.guessList.push('test');
    setUserStats(update);
  };

  const handleAnswer = (answer: string) => {
    console.log('user answers:', answer);

    if (answer === gameData.answer) {
      console.log("Correct!");
    } else {
      console.log("Not Correct.");
      
    }
  };

  return (
    <div className="App">
      {gameData.works.map((work: any, idx: number) => {
        return <WorkTile work={work} idx={idx} />;
      })}
      <AnswerInput handleAnswer={handleAnswer} />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default App;
