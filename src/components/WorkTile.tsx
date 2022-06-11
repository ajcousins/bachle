import React from 'react';
import BachlePlay from '../assets/BachlePlay';
import { SC } from '../scripts/soundcloud';

interface IProps {
  work: any;
  idx: number;
  worksPlaying: { isPlaying: boolean }[];
  setWorksPlaying: React.Dispatch<any>;
}

export default function WorkTile({
  work,
  idx,
  worksPlaying,
  setWorksPlaying,
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
          if (e > (work.startTime + work.duration) * 1000) {
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

  return (
    <div className="work-tile" onClick={handleClick}>
      <div
        className="work-tile__progress-bar"
        style={worksPlaying[idx].isPlaying ? progressing : stopped}
      />
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
}
