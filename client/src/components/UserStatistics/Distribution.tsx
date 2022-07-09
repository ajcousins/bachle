import React from 'react';

interface IProps {
  dist: { [index: string]: number };
}
export default function Distribution({ dist }: IProps) {
  let maxGuess = 0;

  for (const key in dist) {
    if (dist[key] > maxGuess) maxGuess = dist[key];
  }

  return (
    <div className="distribution">
      <div
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 5,
          alignSelf: 'center',
          height: '4em',
        }}
      />

      <div
        className="distribution__bar"
        style={{ height: `${(dist[1] / maxGuess) * 100}%` }}
      >
        <div className="distribution__num-label">{dist[1] || ''}</div>
      </div>
      <div
        className="distribution__bar"
        style={{ height: `${(dist[2] / maxGuess) * 100}%` }}
      >
        <div className="distribution__num-label">{dist[2] || ''}</div>
      </div>
      <div
        className="distribution__bar"
        style={{ height: `${(dist[3] / maxGuess) * 100}%` }}
      >
        <div className="distribution__num-label">{dist[3] || ''}</div>
      </div>
      <div
        className="distribution__bar distribution__lose"
        style={{ height: `${(dist['lose'] / maxGuess) * 100}%` }}
      >
        <div className="distribution__num-label">{dist['lose'] || ''}</div>
      </div>
      <div style={{ alignSelf: 'center' }}>1°</div>
      <div style={{ alignSelf: 'center' }}>2°</div>
      <div style={{ alignSelf: 'center' }}>3°</div>
      <div style={{ alignSelf: 'center' }}>Lost</div>
      <div
        style={{
          gridColumnStart: 1,
          gridColumnEnd: 5,
          alignSelf: 'center',
        }}
      >
        Your score distribution
      </div>
    </div>
  );
}
