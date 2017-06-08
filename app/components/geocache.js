import React from 'react'
import { connect } from 'react-redux'

import Loading from 'components/loading'
import Number from 'components/number'
import Ripple from 'components/ripple'
import vibrate from 'lib/vibrate'

import styles from './geocache.css'

class View extends React.Component {
  componentDidMount () {
    vibrate(300)
  }

  componentDidUpdate (prevProps) {
    const { isFinished, isFurther, waypoint } = this.props

    if (isFinished && !prevProps.isFinished) {
      vibrate([300, 200, 300, 200, 300])
      return
    }
    if (isFurther && !prevProps.isFurther) {
      vibrate([300])
      return
    }
    if (waypoint !== prevProps.waypoint) {
      vibrate([300, 200, 300])
    }
  }

  render () {
    const { waypoint, distance, isFetching, isFinished, isFurther } = this.props

    if (isFinished) {
      return <img src={require('img/finish.svg')} className={styles.finished} />
    }

    if (isFetching) {
      return <Loading />
    }

    const { dist, unit } = distance >= 10000
      ? { dist: distance / 1000, unit: 'km' }
      : { dist: distance, unit: 'm' }

    return (
      <div className={styles.container}>
        <div className={styles.waypoint}>
          {waypoint + 1}
        </div>
        <div className={styles.grow}>
          <div className={styles.child}>
            <Ripple
              period={period(distance)}
              stroke={isFurther ? '#fa5252' : '#51cf66'}
            />
          </div>
        </div>
        <div className={styles.distance}>
          <Number value={Math.max(dist, 1)} fixed />{unit}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ geocache, location }) => ({
  ...geocache,
  accuracy: location.accuracy
})

const period = distance => 450 + 5 * Math.max(0, Math.min(distance, 1000))

export default connect(mapStateToProps)(View)
