import { UPDATE_LOCATION } from 'actions/watch-location'

const initialState = {
  longitude: null,
  latitude: null,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_LOCATION:
      const { longitude, latitude, error } = action
      return {
        ...state,
        longitude,
        latitude,
        error
      }
    default:
      return state
  }
}
