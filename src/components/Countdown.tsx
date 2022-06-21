import React, { useEffect, useState } from 'react';
import {
  getSecondsToTomorrow,
  secsToClockFormat,
} from '../helpers/dateHelpers';

export default function Countdown() {
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecs(getSecondsToTomorrow());
    }, 1000);
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
