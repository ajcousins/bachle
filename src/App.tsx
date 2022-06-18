import React, { useEffect, useState } from 'react';
import './App.scss';
import Header from './components/Header';
import Game from './components/Game/Game';
import { fetchData, condensedDate } from './components/Game/gameHelpers';
import { defaultGame, freshStat } from './components/Game/data';
import MainScreen from './components/MainScreen'

const GAMEDAY_ID = condensedDate();
// const GAMEDAY_ID = '220619';
console.log('Date:', GAMEDAY_ID);

function App() {
  const height = window.innerHeight;
  const [gameData, setGameData] = useState<Game>(defaultGame);
  const [userStats, setUserStats] = useState<Stat | undefined>();
  const [resetState, setResetState] = useState(0);

  // On app first load: Fetch game data. Check local storage. Set userStats.
  useEffect(() => {
    // Fetch game data & update gameData state.
    fetchData(GAMEDAY_ID, setGameData);

    // Local Storage
    const storageString = localStorage.getItem('userStats');
    const stat = freshStat(GAMEDAY_ID);
    let history = [];

    if (!storageString) {
      history.push(stat);
      localStorage.setItem('userStats', JSON.stringify(history));
    } else {
      history = JSON.parse(storageString);
    }

    // does current gameday_id exist in savedArray?
    const idx = history.findIndex((stat: any) => stat.id === GAMEDAY_ID);
    if (idx === -1) {
      history.push(stat);
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

  const handleReset = () => {
    localStorage.removeItem('userStats');
    setUserStats(undefined);
    setResetState(resetState + 1);
  };

  return (
    <div className="App" style={{ height: height }}>
      <Header />
      <MainScreen
        userStats={{ userStats, setUserStats }}
        gameData={{ gameData, setGameData }}
        handleReset={handleReset}
      />
    </div>
  );
}

export default App;
