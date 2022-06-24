import React from 'react';
import Game from './Game';
import Summary from './Summary';

interface IProps {
  userStats: any;
  gameData: any;
}

export default function MainScreen({ userStats, gameData }: IProps) {
  if (userStats.userStats?.hasFinished) {
    return <Summary userStats={userStats} gameData={gameData} />;
  }
  return <Game userStats={userStats} gameData={gameData} />;
}
