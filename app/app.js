import React from 'react'

import Errors from 'components/errors'
import Gps from 'components/gps'
import Geocache from 'components/geocache'
import WakeLock from 'components/wakelock'

import style from './app.css'

export default () =>
  <div className={style.container}>
    <main className={style.grow}>
      <div className={style.child}>
        <Geocache />
      </div>
    </main>
    <footer className={style.footer}>
      <WakeLock />
      <Gps />
      <Errors />
    </footer>
  </div>
