import {
  FETCH_GEO_LAST_DAY,
  SELECT_DATE
} from '../constants/actionTypes'

// reducer for geopoints
const date = (state = {}, action) => {
  switch (action.type) {
    case FETCH_GEO_LAST_DAY:
      return {
        ...state,
        start: action.date,
        end: action.date
      }
    case SELECT_DATE:
      return {
        ...state,
        start: action.date.start,
        end: action.date.end
      }
    default:
      return state
  }
}
export default date
