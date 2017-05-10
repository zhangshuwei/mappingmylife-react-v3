import { combineReducers } from 'redux'

import geolocations from './geolocations'
import mango from './mango'
import date from './date'

const MappingMylifeApp = combineReducers({
  geolocations,
  mango,
  date
})

// export const mustShowSelectionBar = state => state.ui.showSelectionBar || state.ui.selected.length !== 0

export default MappingMylifeApp
