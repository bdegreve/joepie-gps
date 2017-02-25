import React from 'react'
import { connect } from 'react-redux'

import Loading from 'components/loading'
import Squared from 'components/squared'

import styles from './geocache.css'

const View = ({waypoint, distance, accuracy, isFetching}) => {
  if (isFetching) {
    return <Loading />
  }
  return (
    <div className={styles.container}>
      <div className={styles.waypoint}>
        {waypoint}
      </div>
      <div className={styles.grow}>
        <div className={styles.child}>
          <Squared>
            <img src={require('img/ripple.svg')} />
          </Squared>
        </div>
      </div>
      <div className={styles.distance}>
        {Math.round(distance)}m
      </div>
    </div>
  )
}

const mapStateToProps = ({geocache, location}) => ({
  ...geocache,
  accuracy: location.accuracy
})

export default connect(mapStateToProps)(View)
