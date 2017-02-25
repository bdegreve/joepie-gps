import { LOCATION_UPDATE, LOCATION_ERROR } from 'actions/location'

const initialState = {
  latitude: null,
  longitude: null,
  accuracy: null,
  isFetching: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_UPDATE:
      const { latitude, longitude, accuracy } = action
      return {
        ...state,
        latitude,
        longitude,
        accuracy,
        isFetching: false,
        error: null
      }

    case LOCATION_ERROR:
      return {
        ...state,
        error: action.error
      }

    default:
      return state
  }
}
