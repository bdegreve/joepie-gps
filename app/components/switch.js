/* @flow */

import React from 'react'
import type { Children } from 'react'

import styles from './switch.css'

export type Props = {
  checked: any,
  onChange: $FlowFixMe,
  children?: Children
}

export default ({ checked, onChange, children }: Props) => (
  <label className={styles.label}>
    <input
      type='checkbox'
      checked={checked}
      onChange={onChange}
      className={styles.input}
    />
    <div className={styles.switchContainer}>
      <div className={styles.switch} />
    </div>
    {children}
  </label>
)
