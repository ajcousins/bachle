import React, { useContext } from 'react';
import Game from './Game';
import Summary from './Summary';
import { GameContext } from '../context/GameContext';
import dots from '../assets/dots.svg';

export default function MainScreen() {
  const { userStats, gameData } = useContext(GameContext);
  if (userStats?.hasFinished) {
    return <Summary />;
  }
  if (!gameData)
    return (
      <div>
        <img src={dots} alt="loading" />
      </div>
    );
  else return <Game />;
}
