import React from 'react'
import { connect } from 'react-redux'

import Error from 'components/error'
import Loading from 'components/loading'

const Gps = ({latitude, longitude, accuracy, error}) => {
  if (error) {
    return <Error error={error} />
  }
  if (latitude === null || latitude === undefined) {
    return <Loading />
  }
  return (
    <div>
      <p>Latitude: {latitude}</p>
      <p>Longitude: {longitude}</p>
      <p>Accuracy: {accuracy}</p>
    </div>
  )
}

export default connect(state => state.location)(Gps)
