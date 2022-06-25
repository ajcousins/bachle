import React, { useEffect, useState, useContext } from 'react';
import { GameContext } from '../context/GameContext';
import EmojiTiles from './EmojiTiles';
import TrackCredits from './TrackCredits';
import { FIRST_GAME, GAMEDAY_ID } from '../data/appConsts';
import { days } from '../helpers/dateHelpers';
import Countdown from './Countdown';

export default function Summary() {
  const { gameData, userStats } = useContext(GameContext);
  const tileString = gameData.works
    .map((work: any, i: number) => {
      if (!userStats.guessList[i]) return '⬜';
      if (userStats.guessList[i].isCorrect) return '🟩';
      return '🟨';
    })
    .join('');
  const [shareAlert, setShareAlert] = useState(0);

  const handleShare = () => {
    if (shareAlert) return;

    const shareString = `#Bachle-${days(
      FIRST_GAME,
      GAMEDAY_ID
    )}\n🎻${tileString}${
      isWinner(userStats) ? '🎉' : ''
    }\nhttps://www.bachle.app`;
    navigator.clipboard.writeText(shareString);

    setShareAlert(2);
  };

  useEffect(() => {
    const timeout1 = setTimeout(() => {
      setShareAlert(1);
    }, 2000);

    const timeout2 = setTimeout(() => {
      setShareAlert(0);
    }, 2500);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [shareAlert]);

  const alertStyle = (status: number) => {
    const alertVisible: any = {
      display: 'initial',
      opacity: '100%',
    };

    const alertFadeOut: any = {
      display: 'initial',
      opacity: '0%',
      transition: 'opacity 0.5s',
    };

    const alertInvisible: any = {
      display: 'none',
    };

    switch (status) {
      case 2:
        return alertVisible;
      case 1:
        return alertFadeOut;
      default:
        return alertInvisible;
    }
  };

  return (
    <div className="summary-screen">
      <div style={alertStyle(shareAlert)} className="summary-screen__alert">
        Copied to clipboard!
      </div>
      <h2 style={{ margin: '1em 0' }}>
        {isWinner(userStats) ? '🎉 You did it! 🎉' : 'Unlucky!'}
      </h2>
      <div>The answer was</div>
      <h2 style={{ marginBottom: '1em' }}>{gameData.answer}</h2>
      <EmojiTiles />
      <button
        style={{ marginBottom: '2em' }}
        className="btn-full"
        type="button"
        onClick={handleShare}
      >
        SHARE
      </button>
      <TrackCredits />
      <Countdown />
    </div>
  );
}

// Helper functions to be moved elsewhere

function isWinner(stats: any): boolean {
  return stats.guessList.some((guess: any) => guess.isCorrect);
}
