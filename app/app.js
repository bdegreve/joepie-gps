import React from 'react'

import Errors from 'components/errors'
import Geocache from 'components/geocache'
import WakeLock from 'components/wakelock'

import style from './app.css'

export default () => (
  <div className={style.container}>
    <header className={style.header}>
      <a href='http://www.ksa.be/'><img src={require('img/logo-ksa.png')} /></a>
      <h1>Joepie Challenge</h1>
      <a href='http://www.ksadegraal.be'>
        <img src={require('img/logo-degraal.png')} />
      </a>
    </header>
    <main className={style.grow}>
      <div className={style.child}>
        <Geocache />
      </div>
    </main>
    <footer className={style.footer}>
      <WakeLock />
      <Errors />
    </footer>
  </div>
)
