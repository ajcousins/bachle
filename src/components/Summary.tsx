import React from 'react';
import EmojiTiles from './EmojiTiles';
import TrackCredits from './TrackCredits'

interface IProps {
  handleReset: any;
  userStats: any;
  gameData: any;
}

export default function Summary({ handleReset, userStats, gameData }: IProps) {
  return (
    <div className="summary-screen">
      <h2 style={{margin: '1em 0'}}>{isWinner(userStats.userStats) ? '🎉 You did it! 🎉' : 'Unlucky!'}</h2>
      <div>The answer was</div>
      <h2 style={{marginBottom: '1em'}}>{gameData.gameData.answer}</h2>
      <EmojiTiles stats={userStats.userStats} gameData={gameData.gameData}/>
      <TrackCredits gameData={gameData}/>
      <button className="btn-mid" type="button" onClick={handleReset}>
        RESET
      </button>
    </div>
  );
}

// Helper functions to be moved elsewhere

function isWinner(stats: any): boolean {
  return stats.guessList.some((guess: any) => guess.isCorrect);
}

