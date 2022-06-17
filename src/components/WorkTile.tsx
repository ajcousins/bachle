import React from 'react';
import BachlePlay from '../assets/BachlePlay';
import { SC } from '../scripts/soundcloud';

interface IProps {
  work: any;
  idx: number;
  worksPlaying: { isPlaying: boolean }[];
  setWorksPlaying: React.Dispatch<any>;
  userStats?: Stat;
}

export default function WorkTile({
  work,
  idx,
  worksPlaying,
  setWorksPlaying,
  userStats,
}: IProps) {
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

  switch (isActive(idx, userStats)) {
    case 'active-blank':
      return (
        <div className="work-tile__active" onClick={handleClick}>
          <div
            className="work-tile__active__progress-bar"
            style={worksPlaying[idx].isPlaying ? progressing : stopped}
          />
          <div className="work-tile__text">
            <span className="skipped-text">🟩 Track {idx + 1}</span>
           
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
      return (
        <div className="work-tile__active" onClick={handleClick}>
          <div
            className="work-tile__active__progress-bar"
            style={worksPlaying[idx].isPlaying ? progressing : stopped}
          />
          <div className="work-tile__text">
            {userStats.guessList[idx].isSkipped
              ? <span className="skipped-text">🟨 SKIPPED</span>
              : `🟨 ${userStats.guessList[idx].answer} ❌`}
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

    default:
      return <div className="work-tile__inactive" />;
  }
}

const isActive = (idx: number, userStats: Stat): string => {
  if (!userStats.guessList.length) {
    if (idx === 0) return 'active-blank';
  }

  if (userStats.guessList.length === idx) {
    return 'active-blank';
  }

  if (userStats.guessList[idx]) {
    return 'active-filled';
  }

  return 'inactive';
};
