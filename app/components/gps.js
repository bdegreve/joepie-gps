import React from 'react'
import { connect } from 'react-redux'

import Age from 'components/age'
import Number from 'components/number'

const View = ({ latitude, longitude, accuracy, timestamp }) => (
  <div>
    lat <Number value={latitude} fixed={4} />,
    lon <Number value={longitude} fixed={4} />,
    err <Number value={accuracy} fixed={1} />m,
    age <Age timestamp={timestamp} />
  </div>
)

export default connect(state => state.location)(View)
