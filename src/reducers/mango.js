import { combineReducers } from 'redux'

import {
   INDEX_GEOLOCATIONS_BY_DATE_SUCCESS,
   INDEX_PHONECALLS_BY_DATE_SUCCESS
} from '../constants/actionTypes'

// indexing using cozy-stack mango
export const geolocationsIndexByDate = (state = null, action) => {
  switch (action.type) {
    case INDEX_GEOLOCATIONS_BY_DATE_SUCCESS:
      return action.geoIndex
    default:
      return state
  }
}
export const phonecallsIndexByDate = (state = null, action) => {
  switch (action.type) {
    case INDEX_PHONECALLS_BY_DATE_SUCCESS:
      return action.phoneIndex
    default:
      return state
  }
}
export default combineReducers({
  geolocationsIndexByDate,
  phonecallsIndexByDate
})
