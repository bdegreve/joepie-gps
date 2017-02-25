import fetch from 'isomorphic-fetch'

export const WAYPOINTS_FETCHED = 'WAYPOINTS_FETCHED'
const waypointsFetched = waypoints => ({
  type: WAYPOINTS_FETCHED,
  waypoints
})

export const WAYPOINTS_ERROR = 'WAYPOINTS_ERROR'
const waypointError = error => ({
  type: WAYPOINTS_ERROR,
  error
})

export default url =>
  dispatch => fetch(url)
    .then(res => res.json())
    .then(({waypoints}) => {
      if (!waypoints) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('No waypoints in data.')
        }
        throw new Error('No waypoints in data.')
      }
      return dispatch(waypointsFetched(waypoints))
    })
    .catch(err => dispatch(waypointError(err.message)))
