import React, { useContext } from 'react';
import SoundcloudLogo from '../assets/SoundcloudLogo';
import { GameContext } from '../context/GameContext';

export default function TrackCredits() {
  const { gameData } = useContext(GameContext);
  return (
    <>
      {gameData.works.map((work: any, i: number) => {
        return (
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
        );
      })}
    </>
  );
}
