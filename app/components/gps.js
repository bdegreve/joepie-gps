import React from 'react'
import { connect } from 'react-redux'

import Number from 'components/number'
import Restart from 'components/restart'

import style from './gps.css'

const View = ({latitude, longitude, accuracy}) =>
  <div className={style.view}>
    Latitude: <Number value={latitude} fixed={5} />,
    Longitude: <Number value={longitude} fixed={5} />,
    Accuracy: <Number value={accuracy} fixed={1} />
    <span className={style.restart}>
      <Restart />
    </span>
  </div>

export default connect(state => state.location)(View)
