import { combineReducers } from 'redux'

import geolocations from './geolocations'
import mango from './mango'

const MappingMylifeApp = combineReducers({
  geolocations,
  mango
})

// export const mustShowSelectionBar = state => state.ui.showSelectionBar || state.ui.selected.length !== 0

export default MappingMylifeApp
