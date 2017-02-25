import React from 'react'
import { connect } from 'react-redux'

import style from './gps.css'

const View = ({latitude, longitude, accuracy}) =>
  <div className={style.view}>
    Latitude: {latitude},
    Longitude: {longitude},
    Accuracy: {accuracy}
  </div>

export default connect(state => state.location)(View)
