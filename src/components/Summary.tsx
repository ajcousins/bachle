import React, { useEffect, useState } from 'react';
import EmojiTiles from './EmojiTiles';
import TrackCredits from './TrackCredits';
import { FIRST_GAME, GAMEDAY_ID } from '../data/appConsts';
import { idStringToDateObj } from '../helpers/dateHelpers';
import Countdown from './Countdown'

interface IProps {
  handleReset: any;
  userStats: any;
  gameData: any;
}

const days = (first: any, today: any): number => {
  const diff = idStringToDateObj(today)
    .diff(idStringToDateObj(first), ['days'])
    .toObject();
  return diff.days ?? 0;
};

export default function Summary({ handleReset, userStats, gameData }: IProps) {
  const tileString = gameData.gameData.works
    .map((work: any, i: number) => {
      if (!userStats.userStats.guessList[i]) return '⬜';
      if (userStats.userStats.guessList[i].isCorrect) return '🟩';
      return '🟨';
    })
    .join('');
  const [shareAlert, setShareAlert] = useState(false);

  const handleShare = () => {
    if (shareAlert) return;
    console.log('Copied to clipboard');

    const shareString = `#Bachle-${days(
      FIRST_GAME,
      GAMEDAY_ID
    )}\n🎻${tileString}${
      isWinner(userStats.userStats) ? '🎉' : ""
    }\nhttps://www.bachle.app`;
    navigator.clipboard.writeText(shareString);

    setShareAlert(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setShareAlert(false);
    }, 2000);
  }, [shareAlert]);

  const hiddenAlertStyle: any = {
    display: 'initial',
    opacity: '0%',
    transition: 'opacity 0.5s',
  };

  const alertStyle: any = {
    display: 'initial',
    opacity: '100%',
  };

  return (
    <div className="summary-screen">
      <div
        style={shareAlert ? alertStyle : hiddenAlertStyle}
        className="summary-screen__alert"
      >
        Copied to clipboard!
      </div>
      <h2 style={{ margin: '1em 0' }}>
        {isWinner(userStats.userStats) ? '🎉 You did it! 🎉' : 'Unlucky!'}
      </h2>
      <div>The answer was</div>
      <h2 style={{ marginBottom: '1em' }}>{gameData.gameData.answer}</h2>
      <EmojiTiles stats={userStats.userStats} gameData={gameData.gameData} />
      <button
        style={{ marginBottom: '2em' }}
        className="btn-full"
        type="button"
        onClick={handleShare}
      >
        SHARE
      </button>
      <TrackCredits gameData={gameData} />
      <Countdown />
      <button
        style={{ marginBottom: '1em' }}
        className="btn-mid"
        type="button"
        onClick={handleReset}
      >
        RESET
      </button>
    </div>
  );
}

// Helper functions to be moved elsewhere

function isWinner(stats: any): boolean {
  return stats.guessList.some((guess: any) => guess.isCorrect);
}
