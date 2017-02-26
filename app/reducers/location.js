import { LOCATION_UPDATE, LOCATION_ERROR } from 'actions/location'

const REQUIRED_ACCURACY = process.env.NODE_ENV === 'production' ? 20 : 200

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
        isFetching: accuracy > REQUIRED_ACCURACY,
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
