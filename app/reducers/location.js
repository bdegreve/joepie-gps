import { UPDATE_LOCATION } from 'actions/watch-location'

const initialState = {
  latitude: null,
  longitude: null,
  accuracy: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      const { latitude, longitude, accuracy, error } = action
      return {
        ...state,
        latitude,
        longitude,
        accuracy,
        error
      }
    default:
      return state
  }
}
