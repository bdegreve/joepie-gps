import React from 'react'
import { connect } from 'react-redux'

import Error from 'components/error'
import Loading from 'components/loading'

const Gps = ({waypoint, distance, error}) => {
  if (error) {
    return <Error error={error} />
  }
  if (distance === null || distance === undefined) {
    return <Loading />
  }
  return (
    <div>
      <p>waypoint: {waypoint}</p>
      <p>distance: {distance}</p>
    </div>
  )
}

export default connect(state => state.geocache)(Gps)
