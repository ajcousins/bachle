import React, { useContext, useState } from 'react';
import SoundcloudLogo from '../assets/SoundcloudLogo';
import { GameContext } from '../context/GameContext';
import WorkTile from './WorkTile';

export default function TrackCredits() {
  const { gameData } = useContext(GameContext);
  const [worksPlaying, setWorksPlaying] = useState(() =>
    gameData.works.map(() => ({ isPlaying: false }))
  );
  return (
    <>
      {gameData.works.map((work: any, i: number) => {
        return (
          <div className="summary-screen__section" key={`credit-tile-${i}`}>
            <WorkTile
            key={i}
            work={work}
            idx={i}
            worksPlaying={worksPlaying}
            setWorksPlaying={setWorksPlaying}
            summaryScreen
          />
            <div className="summary-screen__detail">
              {work?.detail && work.detail.artworkUrl ? (
                <img
                  className="summary-screen__img"
                  src={work.detail.artworkUrl}
                  alt="Song cover"
                />
              ) : (
                <div
                  className={`summary-screen__detail__img-placeholder gradient-${i}`}
                />
              )}
              <div className="summary-screen__detail__info-wrapper">
                <a
                  href={work?.detail && work.detail.ownerUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  <p className="summary-screen__detail__text">
                    {work?.detail && work.detail.ownerUsername}
                  </p>
                </a>
                <a href={work && work.url} target="_blank" rel="noreferrer">
                  <h4 className="summary-screen__detail__title">
                    {work?.detail && work.detail.title}
                  </h4>
                </a>
                <SoundcloudLogo />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
