import React, { useEffect, useState } from 'react';
import { GAMEDAY_ID } from '../../data/appConsts';
import { getScoreDistribution } from './statHelpers';
import Distribution from './Distribution';
import Separator from './Separator';
import StatSummary from './StatSummary';

export default function UserStatistics() {
  const [gamedayId] = useState(GAMEDAY_ID);
  const [finHistory, setFinHistory] = useState<Stat[] | undefined>();

  useEffect(() => {
    const storageString = localStorage.getItem('userStats');
    if (!storageString) return;
    const history = JSON.parse(storageString).filter((stat: Stat) => {
      return stat.hasFinished;
    });
    setFinHistory(history);
  }, []);

  return (
    <div className="statistics">
      <Distribution dist={getScoreDistribution(finHistory)} />
      <Separator />
      <StatSummary finHistory={finHistory} gamedayId={gamedayId} />
      {/* <p style={{fontSize:'2pt'}}>
      {JSON.stringify(finHistory)}
      </p><p>End</p> */}
    </div>
  );
}
