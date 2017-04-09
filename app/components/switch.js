import React from 'react'

import styles from './switch.css'

export default ({checked, onChange, children}) =>
  <label className={styles.label}>
    <input type='checkbox' checked={checked} onChange={onChange} className={styles.input} />
    <div className={styles.switchContainer}>
      <div className={styles.switch} />
    </div>
    {children}
  </label>
