import React, { useEffect, useState } from 'react';
import {
  getSecondsToTomorrow,
  secsToClockFormat,
} from '../helpers/dateHelpers';

export default function Countdown() {
  const [secs, setSecs] = useState(getSecondsToTomorrow());
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const secs = getSecondsToTomorrow();
      if (secs === 0) {
        setIsAvailable(true);
      }
      setSecs(secs);
    }, 200);
    return () => {
      clearInterval(interval);
    };
  });

  return isAvailable ? (
    <div className="countdown">
      <button className="btn-full" onClick={() => window.location.reload()}>
        Play New Game!
      </button>
    </div>
  ) : (
    <div className="countdown">
      The next Bachle will be available in...
      <h2>{secsToClockFormat(secs)}</h2>
    </div>
  );
}
