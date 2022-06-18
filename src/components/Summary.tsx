import React from 'react';

interface IProps {
  handleReset: any;
  userStats: any;
}

export default function Summary({ handleReset, userStats }: IProps) {
  return (
    <div className="summary-screen">
      {isWinner(userStats.userStats) ? 'You did it!' : 'Unlucky!'}
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
