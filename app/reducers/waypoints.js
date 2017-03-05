import { WAYPOINTS_FETCHED, WAYPOINTS_ERROR } from 'actions/waypoints'

const initialState = {
  waypoints: null,
  isFetching: true,
  error: null
}

export default (state = initialState, action) => {
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
