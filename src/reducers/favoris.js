import { RECEIVE_FAVORISPOINT, ADD_FAVORIS_MAP,
  UPDATE_FAVORIS_MAP, DELETE_FAVORIS_MAP } from '../constants/actionTypes'
import _ from 'lodash'

// reducer for favoris point
const favorisMap = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FAVORISPOINT:
      return action.favorisMap
    case ADD_FAVORIS_MAP:
      return {
        ...state,
        [action.key]: {
          category: action.category,
          id: action.id
        }
      }
    case UPDATE_FAVORIS_MAP:
      return {
        ...state,
        [action.key]: {
          category: action.category,
          id: action.id
        }
      }
    case DELETE_FAVORIS_MAP:
      let newState = _.omit(state, [action.key])
      return newState
    default:
      return state
  }
}
export default favorisMap
