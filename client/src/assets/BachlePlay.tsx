import React from 'react';

interface IProps {
  summaryScreen?: boolean;
}

export default function BachlePlay({summaryScreen}:IProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`play-svg${summaryScreen ? '-summary' : ''}`}
    >
      <polygon
        points="5 3 19 12 5 21 5 3"
        stroke="#FFFFFF"
        fill="#FFFFFF"
        strokeWidth="2px"
      ></polygon>
    </svg>
  );
}
