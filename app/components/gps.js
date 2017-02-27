import React from 'react'
import { connect } from 'react-redux'

import Age from 'components/age'
import Number from 'components/number'
import Restart from 'components/restart'

import style from './gps.css'

const View = ({latitude, longitude, accuracy, timestamp}) =>
  <div className={style.view}>
    lat <Number value={latitude} fixed={5} />,
    lon <Number value={longitude} fixed={5} />,
    err <Number value={accuracy} fixed={1} />m,
    age <Age timestamp={timestamp} />
    <span className={style.restart}>
      <Restart />
    </span>
  </div>

export default connect(state => state.location)(View)
