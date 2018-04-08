/* @flow */

import React from 'react'
import type { Node } from 'react'

import styles from './switch.css'

export type Props = {
  checked: any,
  onChange: $FlowFixMe,
  children?: Node
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
