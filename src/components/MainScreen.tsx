import React, { useContext } from 'react';
import Game from './Game';
import Summary from './Summary';
import { GameContext } from '../context/GameContext';

export default function MainScreen() {
  const { userStats } = useContext(GameContext);
  if (userStats?.hasFinished) {
    return <Summary />;
  }
  return <Game />;
}
