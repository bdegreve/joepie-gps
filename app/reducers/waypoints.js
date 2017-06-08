/* @flow */

import { WAYPOINTS_FETCHED, WAYPOINTS_ERROR } from 'actions/waypoints'

export type Waypoint = {
  +latitude: number,
  +longitude: number
}

export type State = {
  +waypoints: $ReadOnlyArray<Waypoint>,
  +isFetching: boolean,
  +error: string | null
}

const initialState: State = {
  waypoints: [],
  isFetching: true,
  error: null
}

export default (state: State = initialState, action: $FlowFixMe): State => {
  switch (action.type) {
    case WAYPOINTS_FETCHED: {
      return {
        ...state,
        waypoints: action.data.waypoints,
        isFetching: false,
        error: null
      }
    }

    case WAYPOINTS_ERROR: {
      return {
        ...state,
        error: action.error
      }
    }

    default:
      return state
  }
}
