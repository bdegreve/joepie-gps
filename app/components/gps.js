import React from 'react'
import { connect } from 'react-redux'

import style from './gps.css'

const View = ({latitude, longitude, accuracy}) =>
  <div className={style.view}>
    Latitude: {latitude}<br />
    Longitude: {longitude}<br />
    Accuracy: {accuracy}
  </div>

export default connect(state => state.location)(View)
