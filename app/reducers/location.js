/* @flow */

import { LOCATION_UPDATE, LOCATION_ERROR } from 'actions/location'
import { WAYPOINTS_FETCHED } from 'actions/waypoints'

export type State = {
  +latitude: number,
  +longitude: number,
  +accuracy: number,
  +timestamp: number,
  +age: number,
  +isFetching: boolean,
  +error: string | null,
  +requiredAccuracy: number,
  +maxAge: number
}

const initialState: State = {
  latitude: 0,
  longitude: 0,
  accuracy: Infinity,
  timestamp: 0,
  age: Infinity,
  isFetching: true,
  error: null,
  requiredAccuracy: process.env.NODE_ENV === 'production' ? 30 : 300, // meters
  maxAge: 5000 // milliseconds
}

export default (state: State = initialState, action: $FlowFixMe): State => {
  switch (action.type) {
    case LOCATION_UPDATE: {
      const { coords, timestamp, age } = action
      const { latitude, longitude, accuracy } = coords
      const { requiredAccuracy, maxAge } = state
      return {
        ...state,
        latitude,
        longitude,
        accuracy,
        timestamp,
        age,
        isFetching: accuracy > requiredAccuracy || age > maxAge,
        error: null
      }
    }

    case LOCATION_ERROR:
      return {
        ...state,
        error: action.error
      }

    case WAYPOINTS_FETCHED: {
      const {
        accuracy, // meters
        maxAge // seconds
      } = action.data
      return {
        ...state,
        requiredAccuracy: accuracy || state.requiredAccuracy,
        maxAge: maxAge ? 1000 * maxAge : state.maxAge // milliseconds
      }
    }

    default:
      return state
  }
}
