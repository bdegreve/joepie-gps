import React from 'react'

import Errors from 'components/errors'
import Gps from 'components/gps'
import Geocache from 'components/geocache'

import style from './app.css'

export default () =>
  <div className={style.container}>
    <main className={style.main}>
      <div className={style.child}>
        <Geocache />
      </div>
    </main>
    <footer>
      <Gps />
      <Errors />
    </footer>
  </div>
