import React from 'react'

export default ({stroke = '#5cffd6', dur = 2}) =>
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='xMidYMid'>
    <rect x='0' y='0' width='100' height='100' fill='none' />
    <g>
      <animate attributeName='opacity' dur={`${dur}s`} repeatCount='indefinite' begin='0s' keyTimes='0;0.33;1' values='1;1;0' />
      <circle cx='50' cy='50' r='40' stroke={stroke} fill='none' strokeWidth='6' strokeLinecap='round'>
        <animate attributeName='r' dur={`${dur}s`} repeatCount='indefinite' begin='0s' keyTimes='0;0.33;1' values='0;22;44' />
      </circle>
    </g>
    <g>
      <animate attributeName='opacity' dur={`${dur}s`} repeatCount='indefinite' begin={`${dur / 2}s`} keyTimes='0;0.33;1' values='1;1;0' />
      <circle cx='50' cy='50' r='40' stroke={stroke} fill='none' strokeWidth='6' strokeLinecap='round'>
        <animate attributeName='r' dur={`${dur}s`} repeatCount='indefinite' begin={`${dur / 2}s`} keyTimes='0;0.33;1' values='0;22;44' />
      </circle>
    </g>
  </svg>
