import React, { useEffect, useState, useMemo } from 'react';
import './App.scss';
import Header from './components/Header';
import MainScreen from './components/MainScreen';
import Modal from './components/Modal';
import { GameContext } from './context/GameContext';
import { fetchData } from './components/Game/gameHelpers';
import { GAMEDAY_ID } from './data/appConsts';
import updateHistory from './helpers/updateHistory';

console.log("Today:", GAMEDAY_ID);

function getWindowHeight() {
  return window.innerHeight;
}

function App() {
  const [gamedayId] = useState(GAMEDAY_ID);
  const [windowHeight, setWindowHeight] = useState<number>(getWindowHeight());
  const [gameData, setGameData] = useState<Game | undefined>();
  const [userStats, setUserStats] = useState<Stat | undefined>();
  const [resetState, setResetState] = useState(0);
  const [activeModal, setActiveModal] = useState<null | string>(null);
  const [history, setHistory] = useState<Stat[] | undefined>();

  const gameProviderValue = useMemo(
    () => ({
      gameData,
      setGameData,
      userStats,
      setUserStats,
      activeModal,
      setActiveModal,
      history,
      setHistory,
    }),
    [gameData, userStats, activeModal, history]
  );

  useEffect(() => {
    fetchData(gamedayId).then((data) => {
      setGameData(data?.data.game);
    });
    // Forces a reset when incremented
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [resetState]);

  // If gameData updates at anytime: update the history and align with state
  useEffect(() => {
    const newHistory = updateHistory(gameData, gamedayId);
    if (!newHistory) return;
    setHistory(newHistory);
  }, [gameData, gamedayId]);

  // if history updates at anytime: update the current userStats/gameProgess
  useEffect(() => {
    if (!history) return;
    let curIdx = history.findIndex(
      (stat: Stat) => stat.id.toString() === gamedayId
    );
    if (curIdx === -1) return;
    setUserStats(history[curIdx]);
  }, [history, gamedayId]);

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

  // Dynamic height. vh unit in CSS is broken for full screen apps.
  useEffect(() => {
    function handleWindowResize() {
      setWindowHeight(getWindowHeight());
    }
    window.addEventListener('resize', handleWindowResize);
    window.addEventListener('orientationchange', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('orientationchange', handleWindowResize);
    };
  }, []);

  const handleReset = () => {
    localStorage.removeItem('userStats');
    setUserStats(undefined);
    setResetState(resetState + 1);
    setActiveModal(null);
  };

  return (
    <div
      className="App"
      style={userStats?.hasFinished ? {} : { height: windowHeight }}
    >
      <GameContext.Provider value={gameProviderValue}>
        <Header gameFinished={userStats?.hasFinished ?? false} />
        <MainScreen />
        <Modal handleReset={handleReset} />
      </GameContext.Provider>
    </div>
  );
}

export default App;
