import { combineReducers } from 'redux'
import { RECEIVE_TOP_GEOLOCATIONS, RECEIVE_TOP_PHONECALLS, RECEIVE_FAVORISPOINT } from '../constants/actionTypes'

// reducer for top geopoints
const topGeolocations = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_TOP_GEOLOCATIONS:
      return action.topGeolocations
    default:
      return state
  }
}
// reducer for top phonecalls
const topPhonecalls = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_TOP_PHONECALLS:
      return action.topPhonecalls
    default:
      return state
  }
}
//reducer for favoris point
const favorisPoint = (state =[], action) => {
  switch (action.type) {
    case RECEIVE_FAVORISPOINT:
      return action.favorisPoint
    default:
      return state
  }
}
export default combineReducers({
  topGeolocations,
  topPhonecalls,
  favorisPoint
})
