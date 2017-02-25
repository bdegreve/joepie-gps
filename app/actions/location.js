export const LOCATION_UPDATE = 'LOCATION_UPDATE'
export const LOCATION_ERROR = 'LOCATION_ERROR'

export default dispatch => {
  if (typeof document === 'undefined') {
    // server side rendering, don't do anything ...
    return
  }

  if (!navigator.geolocation) {
    console.warn('Geolocation is not supported by this browser')
    dispatch({
      type: LOCATION_ERROR,
      error: 'Geolocation is not supported by this browser.'
    })
    return
  }

  return navigator.geolocation.watchPosition(
    pos => {
      const { latitude, longitude, accuracy } = pos.coords
      dispatch({
        type: LOCATION_UPDATE,
        latitude,
        longitude,
        accuracy
      })
    },
    err => {
      dispatch({
        type: LOCATION_ERROR,
        error: `${err.message} (error ${err.code})`
      })
    }, {
      enableHighAccuracy: true
    }
  )
}
