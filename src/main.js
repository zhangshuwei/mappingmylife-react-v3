/* global cozy */

import React from 'react'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers'
import { createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import AppRoute from './components/AppRoute'
import 'bootstrap-css'
import 'bootstrap-theme-css'
import 'font-awesome-css'
import 'ionicons-css'
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)

document.addEventListener('DOMContentLoaded', () => {
  const applicationElement = document.querySelector('[role=application]')
  const cozyOptions = {
    cozyURL: `//${applicationElement.dataset.cozyDomain}`,
    token: applicationElement.dataset.cozyToken
  }
  cozy.client.init(cozyOptions)
  render((
    <AppRoute store={store} />
  ), applicationElement)
})
