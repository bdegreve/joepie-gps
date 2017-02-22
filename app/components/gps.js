import React from 'react'

import Error from 'components/error'
import Loading from 'components/loading'

export default class extends React.Component {
  constructor () {
    super()
    this.state = {
      latitude: null,
      longitude: null,
      isLoading: true,
      error: null
    }
  }

  componentDidMount () {
    if (!navigator.geolocation) {
      console.warn('Geolocation is not supported by this browser')
      this.setState({
        error: 'Geolocation is not supported by this browser',
        isLoading: false
      })
      return
    }
    this._watchId = navigator.geolocation.watchPosition(pos => {
      console.log('--', pos)
      const { latitude, longitude } = pos.coords
      this.setState({
        latitude,
        longitude,
        isLoading: false
      })
    })
  }

  componentWillUnmount () {
    if (this._watchId) {
      navigator.geolocation.clearWatch(this._watchId)
    }
  }

  render () {
    const { latitude, longitude, isLoading, error } = this.state
    if (error) {
      return <Error error={error} />
    }
    if (isLoading) {
      return <Loading />
    }
    return (
      <div>
        <p>Latitude: {latitude}</p>
        <p>Longitude: {longitude}</p>
      </div>
    )
  }
}
