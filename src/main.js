import React from 'react'
import thunk from 'redux-thunk'
import {createLogger} from 'redux-logger'
import rootReducer from './reducers'
import { createStore, applyMiddleware} from 'redux'
import { render } from 'react-dom'
import AppRoute from './components/AppRoute'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
const middleware = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(...middleware)
)
render((
  <AppRoute store={store}/>
), document.getElementById('root') )
