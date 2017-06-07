import { combineReducers } from 'redux'
import { FETCH_ITINERARY } from '../constants/actionTypes'

// reducer for top geopoints
const path = (state = [], action) => {
  switch (action.type) {
    case FETCH_ITINERARY:
      return {
        ...state,
        path: action.path
      }
    default:
      return state
  }
}

export default combineReducers({
  path
})
