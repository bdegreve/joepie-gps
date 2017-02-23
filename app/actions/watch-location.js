export const UPDATE_LOCATION = 'UPDATE_LOCATION'

export default (dispatch) => {
  if (!navigator.geolocation) {
    console.warn('Geolocation is not supported by this browser')
    dispatch({
      type: UPDATE_LOCATION,
      error: 'Geolocation is not supported by this browser.'
    })
    return
  }

  return navigator.geolocation.watchPosition(pos => {
    const { latitude, longitude } = pos.coords
    dispatch({
      type: UPDATE_LOCATION,
      latitude,
      longitude
    })
  })
}
