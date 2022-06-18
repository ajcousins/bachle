import React from 'react';
import Game from './Game'
import Summary from './Summary'

interface IProps {
  userStats: any;
  gameData: any;
  handleReset: any;
}

export default function MainScreen({
  userStats,
  gameData,
  handleReset,
}:IProps) {
  if (userStats.userStats?.hasFinished) {
    return (
      
      <Summary 
      userStats={userStats}
      gameData={gameData}
      handleReset={handleReset}
      />
    );
  }
  return (
    <Game
      userStats={userStats}
      gameData={gameData}
      handleReset={handleReset}
    />
  );
}
