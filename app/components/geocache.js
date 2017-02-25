import React from 'react'
import { connect } from 'react-redux'

import Loading from 'components/loading'

const View = ({waypoint, distance, isFetching}) => {
  if (isFetching) {
    return <Loading />
  }
  return (
    <div>
      <p>waypoint: {waypoint}</p>
      <p>distance: {distance}</p>
    </div>
  )
}

export default connect(state => state.geocache)(View)
