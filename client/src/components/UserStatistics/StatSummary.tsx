import React from 'react';
import { numWon, getCurrentStreak, getMaxStreak } from './statHelpers';

interface IProps {
  finHistory: any;
  gamedayId: string;
}

export default function StatSummary({ finHistory, gamedayId }: IProps) {
  return (
    <div className="stat-summary">
      {!finHistory ? null : (
        <>
          <h2>
            {numWon(finHistory)} / {finHistory.length}
          </h2>
          <h2>
            {Math.round(
              (numWon(finHistory) / (finHistory ? finHistory.length : 0)) * 1000
            ) / 10 || 0}
            %
          </h2>
          <h2>
            {getCurrentStreak(finHistory, gamedayId)} :{' '}
            {getMaxStreak(finHistory)}
          </h2>
          <p>Correct</p>
          <p>Correct %</p>
          <p>Current : Max Streak</p>
        </>
      )}
    </div>
  );
}
