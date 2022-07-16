import React from 'react';
import {
  todayIsDone,
  numWon,
  getCurrentStreak,
  getMaxStreak,
} from './statHelpers';
import { yesterdayId } from '../../helpers/dateHelpers';

interface IProps {
  finHistory: any;
  gamedayId: string;
}

export default function StatSummary({ finHistory, gamedayId }: IProps) {
  const endDate = todayIsDone(finHistory, gamedayId)
    ? gamedayId
    : yesterdayId(gamedayId);

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
            {getCurrentStreak(finHistory, endDate)} : {getMaxStreak(finHistory)}
          </h2>
          <p>Correct</p>
          <p>Correct %</p>
          <p>Current : Max Streak</p>
        </>
      )}
    </div>
  );
}
