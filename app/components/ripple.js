import React from 'react'

import styles from './ripple.css'

export default ({stroke = '#5cffd6', dur = 2}) =>
  <svg viewBox='0 0 100 100' preserveAspectRatio='xMidYMid' className={styles.container}>
    <rect x='0' y='0' width='100' height='100' fill='none' />
    <g>
      <animate attributeName='opacity' dur={dur} repeatCount='indefinite' begin='0s' keyTimes='0;0.33;1' values='1;1;0' />
      <circle cx='50' cy='50' r='40' stroke={stroke} fill='none' strokeWidth='6' strokeLinecap='round'>
        <animate attributeName='r' dur={dur} repeatCount='indefinite' begin='0s' keyTimes='0;1' values='0;44' />
      </circle>
    </g>
    <g>
      <animate attributeName='opacity' dur={dur} repeatCount='indefinite' begin='0s' keyTimes='0;0.5;0.5;0.83;1' values='0.75;0;1;1;0.75' />
      <circle cx='50' cy='50' r='27.5' stroke={stroke} fill='none' strokeWidth='6' strokeLinecap='round'>
        <animate attributeName='r' dur={dur} repeatCount='indefinite' begin='0s' keyTimes='0;0.5;0.5;1' values='22;44;0;22' />
      </circle>
    </g>
  </svg>
