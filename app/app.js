import React from 'react'

import Errors from 'components/errors'
import Gps from 'components/gps'
import Geocache from 'components/geocache'

import style from './app.css'

export default () =>
  <div className={style.container}>
    <header className={style.header}>
      <h1>Joepie Challenge</h1>
    </header>
    <main className={style.main}>
      <Geocache />
    </main>
    <footer>
      <Gps />
      <Errors />
    </footer>
  </div>
