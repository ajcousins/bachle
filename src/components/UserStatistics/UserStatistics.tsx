import React, { useEffect, useState, useContext } from 'react';
import { GameContext } from '../../context/GameContext';
import { consecDateStrings } from '../../helpers/dateHelpers';

export default function UserStatistics() {
  const { gamedayId } = useContext(GameContext);
  const [finHistory, setFinHistory] = useState<Stat[] | undefined>();

  useEffect(() => {
    const storageString = localStorage.getItem('userStats');
    if (!storageString) return;
    const history = JSON.parse(storageString).filter((stat: Stat) => {
      return stat.hasFinished;
    });
    setFinHistory(history);
  }, []);

  useEffect(() => {
    console.log('finished history:', finHistory);
  }, [finHistory]);

  return (
    <div className="statistics">
      UserStatistics
      <ul>
        <li>Completed Games: {finHistory?.length}</li>
        <li>Won Games: {numWon(finHistory)}</li>
        <li>
          Correct %:{' '}
          {Math.round(
            (numWon(finHistory) / (finHistory ? finHistory.length : 0)) * 1000
          ) / 10 || 0}
          %
        </li>
        <li>Current Streak: {getStreak(finHistory, gamedayId)}</li>
      </ul>
    </div>
  );
}

const numWon = (history: Stat[] | undefined): number => {
  if (!history) return 0;
  return history.reduce(
    (prev: number, cur: Stat): number =>
      cur.guessList.some((guess) => guess.isCorrect) ? prev + 1 : prev,
    0
  );
};

export const getStreak = (
  history: Stat[] | undefined,
  gamedayId?: string
): number => {
  if (!history) return 0;

  const gamesInHistory = history
    // .filter((stat: Stat) => stat.guessList.some((guess) => guess.isCorrect))
    .map((stat: Stat) => {
      return {
        id: stat.id,
        winningGuessIdx: stat.guessList.some((guess) => guess.isCorrect)
          ? stat.guessList.findIndex((guess) => guess.isCorrect)
          : undefined,
      };
    })
    .sort((a: any, b: any) => (Number(a.id) > Number(b.id) ? 1 : -1));

  console.log('datesInHist:', gamesInHistory);

  // if (gamesInHistory.length === 0) return 0;

  const dateCheckArr = consecDateStrings(gamesInHistory[0].id);

  // console.log('dateCheckArr:', dateCheckArr);

  const counts: number[] = [];

  let currentCount: number = 0;

  dateCheckArr.forEach((date) => {
    const histIdx = gamesInHistory.findIndex((game) => {
      return game.id === date;
    });
    // console.log("histIdx:", histIdx);

    if (histIdx === -1) {
      // was not attempted or did not finish
      // console.log('Not attempted');
      
      if (currentCount !== 0) {
        counts.push(currentCount);
        currentCount = 0;
      }
    } else if (gamesInHistory[histIdx].winningGuessIdx !== undefined) {
      // was attempted and WON
      // console.log('Attempted and won');
      currentCount = currentCount + 1;
    } else {
      // was attempted and LOST
      // console.log('Attempted and lost');
      
      if (currentCount !== 0) {
        counts.push(currentCount);
        currentCount = 0;
      }
    }
    // console.log('Current count:', currentCount);
    
  });

  const maxCount = counts.reduce((prev, cur) => {
    if (cur > prev) return cur;
    else return prev;
  }, 0)

  return counts.length ? maxCount : 0;
};
