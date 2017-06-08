import fetch from 'isomorphic-fetch'

export const WAYPOINTS_FETCHED = 'WAYPOINTS_FETCHED'
const waypointsFetched = data => ({
  type: WAYPOINTS_FETCHED,
  data
})

export const WAYPOINTS_ERROR = 'WAYPOINTS_ERROR'
const waypointError = error => ({
  type: WAYPOINTS_ERROR,
  error
})

export default url => dispatch =>
  fetch(url)
    .then(res => res.json())
    .then(({ data }) => {
      if (!data || !data.waypoints) {
        if (process.env.NODE_ENV !== 'production') {
          console.warn('No waypoints in response.')
        }
        throw new Error('No waypoints in response.')
      }
      return dispatch(waypointsFetched(data))
    })
    .catch(err => dispatch(waypointError(err.message)))
