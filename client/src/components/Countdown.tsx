import React, { useEffect, useState } from 'react';
import {
  getSecondsToTomorrow,
  secsToClockFormat,
} from '../helpers/dateHelpers';

export default function Countdown() {
  const [secs, setSecs] = useState(getSecondsToTomorrow());

  useEffect(() => {
    const interval = setInterval(() => {
      setSecs(getSecondsToTomorrow());
    }, 200);
    return () => {
      clearInterval(interval);
    };
  });

  return (
    <div className="countdown">
      The next Bachle will be available in...
      <h2>{secsToClockFormat(secs)}</h2>
    </div>
  );
}
