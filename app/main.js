import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import watchLocation from 'actions/location'
import fetchWaypoints from 'actions/waypoints'

import App from './app'
import store from './store'
import isomorphic from './isomorphic'
import './main.css'

const Root = () =>
  <Provider store={store}>
    <App />
  </Provider>

if (typeof document !== 'undefined') {
  watchLocation(action => store.dispatch(action))
  store.dispatch(fetchWaypoints('waypoints.json'))
  ReactDOM.render(<Root />, document.getElementById('root'))
}

export default isomorphic(Root, {
  title: 'Joepie Challenge'
})
