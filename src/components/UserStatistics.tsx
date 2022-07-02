import React, { useEffect, useState } from 'react';

export default function UserStatistics() {
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
