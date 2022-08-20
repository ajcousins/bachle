import React, { useContext } from 'react';
import BachlePlay from '../assets/BachlePlay';
import { SC } from '../scripts/soundcloud';
import { GameContext } from '../context/GameContext';

interface IProps {
  work: any;
  idx: number;
  worksPlaying: { isPlaying: boolean }[];
  setWorksPlaying: React.Dispatch<any>;
  summaryScreen?: boolean;
}

export default function WorkTile({
  work,
  idx,
  worksPlaying,
  setWorksPlaying,
  summaryScreen,
}: IProps) {
  const { userStats } = useContext(GameContext);
  const setIsPlaying = (playing: boolean, idx: number) => {
    const worksPlayingCopy = worksPlaying.map(() => ({ isPlaying: false }));
    worksPlayingCopy.splice(idx, 1, { isPlaying: playing });
    setWorksPlaying(worksPlayingCopy);
  };

  const handleClick = () => {
    const widget = document.querySelector(`#work${idx}`);
    const widget1 = SC.Widget(widget);

    if (!worksPlaying[idx].isPlaying) {
      widget1.seekTo(work.startTime * 1000);
      widget1.play();
      setIsPlaying(true, idx);

      widget1.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
        widget1.getPosition((e: any) => {
          if (e > (Number(work.startTime) + Number(work.duration)) * 1000) {
            widget1.pause();
            setIsPlaying(false, idx);
          }
        });
      });
    } else {
      widget1.pause();
      setIsPlaying(false, idx);
    }
  };

  const stopped = {
    width: '0%',
    transition: `width 0.2s`,
  };

  const progressing = {
    width: '100%',
    transition: `width ${work.duration}s`,
    transitionTimingFunction: 'linear',
  };

  if (!userStats) return <></>;
  let answerTile = '';

  switch (isActive(idx, userStats, summaryScreen)) {
    case 'active-blank':
      answerTile = '⬜';
      return (
        <div className="work-tile__active" onClick={handleClick}>
          <div
            className="work-tile__active__progress-bar"
            style={worksPlaying[idx].isPlaying ? progressing : stopped}
          />
          <div className="work-tile__text">
            <span className="skipped-text">
              {answerTile} Track {idx + 1}
            </span>
            {idx === 0 && (
              <span
                style={{
                  width: '100%',
                  marginLeft: '1em',
                  fontStyle: 'italic',
                  color: '#ffffff77',
                }}
              >
                Tap to play track
              </span>
            )}
          </div>
          <BachlePlay />
          <iframe
            allow="autoplay"
            title="widget"
            style={{ display: 'none' }}
            id={`work${idx}`}
            className="all-widgets"
            src={`https://w.soundcloud.com/player/?url=${work.url}`}
          />
        </div>
      );

    case 'active-filled':
      answerTile = userStats.guessList[idx]?.isCorrect ? '🟩' : '🟨';
      return (
        <div className="work-tile__active" onClick={handleClick}>
          {summaryScreen && (
            <div className="work-tile__summary-small-heading">
              TRACK {idx + 1} - You guessed...
            </div>
          )}
          <div
            className={`work-tile__active__progress-bar${
              summaryScreen ? '-summary' : ''
            }`}
            style={worksPlaying[idx].isPlaying ? progressing : stopped}
          />
          <div className={`work-tile__text${summaryScreen ? '-summary' : ''}`}>
            {userStats.guessList[idx].isSkipped ? (
              <span className="skipped-text">🟨 SKIPPED</span>
            ) : (
              `${answerTile} ${userStats.guessList[idx].answer}`
            )}
          </div>

          <BachlePlay summaryScreen={summaryScreen} />
          <iframe
            allow="autoplay"
            title="widget"
            style={{ display: 'none' }}
            id={`work${idx}`}
            className="all-widgets"
            src={`https://w.soundcloud.com/player/?url=${work.url}?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing`}
          />
        </div>
      );

    default:
      return <div className="work-tile__inactive" />;
  }
}

const isActive = (
  idx: number,
  userStats: Stat,
  summaryScreen?: boolean
): string => {
  if (!userStats.guessList.length) {
    if (idx === 0) return 'active-blank';
  }

  if (userStats.guessList.length === idx) {
    return 'active-blank';
  }

  if (userStats.guessList[idx]) {
    return 'active-filled';
  }

  if (summaryScreen) {
    return 'active-blank';
  }

  return 'inactive';
};
