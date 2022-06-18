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
        handleReset={handleReset}
        userStats={userStats}
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
