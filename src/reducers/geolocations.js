import {
  RECEIVE_GEOLOCATIONS
} from '../constants/actionTypes'

// reducer for geopoints
const geolocations = (state = { geolocations: [] }, action) => {
  switch (action.type) {
    case RECEIVE_GEOLOCATIONS:
      return {
        geolocations: action.geolocations
      }
    default:
      return state
  }
}
export default geolocations
