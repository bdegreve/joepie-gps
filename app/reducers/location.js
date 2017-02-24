import { UPDATE_LOCATION } from 'actions/watch-location'

const initialState = {
  longitude: null,
  latitude: null,
  accuracy: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      const { longitude, latitude, accuracy, error } = action
      return {
        ...state,
        longitude,
        latitude,
        accuracy,
        error
      }
    default:
      return state
  }
}
