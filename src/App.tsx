import React, { useRef, useEffect, useState } from 'react';
import './App.scss';
import WorkTile from './components/WorkTile';
import Highlights from './components/Highlights';

const gameData: any = {
  id: 1,
  answer: 'Bach, Johann Sebastian',
  works: [
    {
      title: 'Matthäus Passion (BWV 244) - Erbarme Dich',
      url: 'https://soundcloud.com/pensatore/002-johann-sebastian-bach-matthaus-passion-bwv-244-erbarme-dich?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      startTime: 30,
      duration: 5,
    },
    {
      title: '"Chaconne" from Partita in D Minor for Solo Violin - Tim Fain',
      url: 'https://soundcloud.com/onbeing/tim-fain-chaconne-from-partita-in-d-minor-for-solo-violin-by-johann-sebastian-bach?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      startTime: 30,
      duration: 7.5,
    },
    {
      title: 'Suite for Cello solo no 1 in G major-Prelude',
      url: 'https://soundcloud.com/necmusic/bach-suite-for-cello-solo-no-1?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
      startTime: 3,
      duration: 10,
    },
  ],
};

function App() {
  return (
    <div className="App">
      {gameData.works.map((work: any, idx: number) => {
        return <WorkTile work={work} idx={idx} />;
      })}
      <Highlights />
    </div>
  );
}

export default App;
