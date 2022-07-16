import React from 'react';

export default function Dots() {
  return (
    <svg
      style={{
        margin: 'auto',
        background: 'rgba(209, 157, 157, 0)',
        display: 'block',
        shapeRendering: 'auto',
      }}
      width="249px"
      height="249px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <g transform="rotate(0 50 50)">
        <rect x="48" y="37" rx="2" ry="2" width="4" height="4" fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.5625s"
            begin="-1.40625s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(36 50 50)">
        <rect x="48" y="37" rx="2" ry="2" width="4" height="4" fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.5625s"
            begin="-1.25s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(72 50 50)">
        <rect x="48" y="37" rx="2" ry="2" width="4" height="4" fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.5625s"
            begin="-1.09375s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(108 50 50)">
        <rect x="48" y="37" rx="2" ry="2" width="4" height="4" fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.5625s"
            begin="-0.9375s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(144 50 50)">
        <rect x="48" y="37" rx="2" ry="2" width="4" height="4" fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.5625s"
            begin="-0.78125s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(180 50 50)">
        <rect x="48" y="37" rx="2" ry="2" width="4" height="4" fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.5625s"
            begin="-0.625s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(216 50 50)">
        <rect x="48" y="37" rx="2" ry="2" width="4" height="4" fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.5625s"
            begin="-0.46875s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(252 50 50)">
        <rect x="48" y="37" rx="2" ry="2" width="4" height="4" fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.5625s"
            begin="-0.3125s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(288 50 50)">
        <rect x="48" y="37" rx="2" ry="2" width="4" height="4" fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.5625s"
            begin="-0.15625s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
      <g transform="rotate(324 50 50)">
        <rect x="48" y="37" rx="2" ry="2" width="4" height="4" fill="#000000">
          <animate
            attributeName="opacity"
            values="1;0"
            keyTimes="0;1"
            dur="1.5625s"
            begin="0s"
            repeatCount="indefinite"
          ></animate>
        </rect>
      </g>
    </svg>
  );
}
