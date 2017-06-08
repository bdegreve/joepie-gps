/* @flow */

import React from 'react'

import styles from './loading.css'

export default () => (
  <img src={require('img/gps.svg')} className={styles.loading} />
)
