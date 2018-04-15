/* @flow */

import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import Loading from 'components/loading'
import watchLocation from 'actions/location'
import fetchWaypoints from 'actions/waypoints'

import App from './app'
import store from './store'
import isomorphic from './isomorphic'
import './main.css'

const Root = ({ persistor }) => (
  <Provider store={store}>
    <PersistGate loader={Loading} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)

if (typeof document !== 'undefined') {
  watchLocation(action => store.dispatch(action))
  store.dispatch(fetchWaypoints('waypoints.json'))
  const persistor = persistStore(store)
  const root = document.getElementById('root')
  if (root) {
    ReactDOM.render(<Root persistor={persistor} />, root)
  }
}

export default isomorphic(Root, {
  title: 'Joepie Challenge'
})
