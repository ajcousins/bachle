import React, { useContext } from 'react';
import Game from './Game';
import Summary from './Summary';
import { GameContext } from '../context/GameContext';
import Dots from '../assets/Dots';

export default function MainScreen() {
  const { userStats, gameData } = useContext(GameContext);
  if (userStats?.hasFinished) {
    return <Summary />;
  }
  if (!gameData)
    return (
      <div>
        <Dots />
      </div>
    );
  else return <Game />;
}
