import {
  FETCH_GEO_LAST_DAY
} from '../constants/actionTypes'

// reducer for geopoints
const date = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GEO_LAST_DAY:
      return {
        ...state,
        start: action.date
      }
    default:
      return state
  }
}
export default date
