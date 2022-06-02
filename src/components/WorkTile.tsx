import React, { useState } from 'react';
import { SC } from '../scripts/soundcloud';

interface IProps {
  work: any;
  idx: number;
}

export default function WorkTile({ work, idx }: IProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    const widget = document.querySelector(`#work${idx}`);
    const widget1 = SC.Widget(widget);

    if (!isPlaying) {
      // TO DO: stop all other works from playing
      widget1.seekTo(work.startTime * 1000);
      widget1.play();
      setIsPlaying(true);

      widget1.bind(SC.Widget.Events.PLAY_PROGRESS, () => {
        widget1.getPosition((e: any) => {
          console.log('pos:', e);
          if (e > (work.startTime + work.duration) * 1000) {
            widget1.pause();
            setIsPlaying(false);
          }
        });
      });
    } else {
      widget1.pause();
      setIsPlaying(false);
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
    <div className="work-tile">
      <button onClick={handleClick}>Play</button>
      <div
        className="work-tile__progress-bar"
        style={isPlaying ? progressing : stopped}
      />
      <iframe
        // width="100%"
        // height="166"
        // scrolling="no"
        allow="autoplay"
        title="widget"
        style={{ display: 'none' }}
        id={`work${idx}`}
        src={`https://w.soundcloud.com/player/?url=${work.url}`}
      />
    </div>
  );
}
