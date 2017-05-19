import { combineReducers } from 'redux'

import geolocations from './geolocations'
import mango from './mango'
import date from './date'
import phonecalls from './phonecalls'
import mostpoints from './mostpoints'
const rootReducer = combineReducers({
  geolocations,
  phonecalls,
  mango,
  date,
  mostpoints
})

// export const mustShowSelectionBar = state => state.ui.showSelectionBar || state.ui.selected.length !== 0

export default rootReducer
