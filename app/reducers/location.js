import { LOCATION_UPDATE, LOCATION_ERROR } from 'actions/location'

const REQUIRED_ACCURACY = process.env.NODE_ENV === 'production' ? 30 : 300
const MAX_AGE = 5000 // milliseconds

const initialState = {
  latitude: null,
  longitude: null,
  accuracy: null,
  timestamp: null,
  age: null,
  isFetching: true,
  error: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case LOCATION_UPDATE:
      const { coords, timestamp, age } = action
      const { latitude, longitude, accuracy } = coords
      return {
        ...state,
        latitude,
        longitude,
        accuracy,
        timestamp,
        age,
        isFetching: accuracy > REQUIRED_ACCURACY || age > MAX_AGE,
        error: accuracy > REQUIRED_ACCURACY
          ? `Accuracy not good enough (yet): ${accuracy} > ${REQUIRED_ACCURACY}`
          : null
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
