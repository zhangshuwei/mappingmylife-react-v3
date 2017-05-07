import { combineReducers } from 'redux'

import {
   INDEX_GEOLOCATIONS_BY_DATE_SUCCESS
} from '../constants/actionTypes'

// indexing using cozy-stack mango
export const geolocationsIndexByDate = (state = null, action) => {
  switch (action.type) {
    case INDEX_GEOLOCATIONS_BY_DATE_SUCCESS:
      return action.mangoIndexByDate
    default:
      return state
  }
}

export default combineReducers({
  geolocationsIndexByDate
})
