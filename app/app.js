import React from 'react'

import Errors from 'components/errors'
import Gps from 'components/gps'
import Geocache from 'components/geocache'
import Restart from 'components/restart'
import WakeLock from 'components/wakelock'

import style from './app.css'

export default () =>
  <div className={style.container}>
    <header className={style.header}>
      <a href='http://www.ksa.be/'><img src={require('img/logo-ksa.png')} /></a>
      <h1>Joepie Challenge</h1>
      <a href='http://www.ksadegraal.be'><img src={require('img/logo-degraal.png')} /></a>
    </header>
    <main className={style.grow}>
      <div className={style.child}>
        <Geocache />
      </div>
    </main>
    <footer className={style.footer}>
      <div className={style.restart}>
        <Restart />
      </div>
      <WakeLock />
      <Gps />
      <Errors />
    </footer>
  </div>
