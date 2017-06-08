/* @flow */

export const LOCATION_UPDATE = 'LOCATION_UPDATE'
export const LOCATION_ERROR = 'LOCATION_ERROR'

export default (dispatch: $FlowFixMe) => {
  if (typeof document === 'undefined') {
    // server side rendering, don't do anything ...
    return
  }

  if (!navigator.geolocation) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('Geolocation is not supported by this browser')
    }
    dispatch({
      type: LOCATION_ERROR,
      error: 'Geolocation is not supported by this browser.'
    })
    return
  }

  return navigator.geolocation.watchPosition(
    pos => {
      const { coords, timestamp } = pos
      dispatch({
        type: LOCATION_UPDATE,
        coords,
        timestamp,
        age: Date.now() - timestamp
      })
    },
    err => {
      let msg = err.message
      switch (err.code) {
        case err.PERMISSION_DENIED:
          msg =
            'Geolocation denied. Allow this site to access your position, and try again.'
          break
        case err.POSITION_UNAVAILABLE:
          msg = 'Geolocation failed. Your position is unavailable.'
          break
        case err.TIMEOUT:
          msg =
            'Timeout. Failed to obtain your position within a reasonable time.'
          break
      }
      dispatch({
        type: LOCATION_ERROR,
        error: `${msg} (error ${err.code})`
      })
    },
    {
      enableHighAccuracy: true,
      maximumAge: 5000,
      timeout: Infinity
    }
  )
}
