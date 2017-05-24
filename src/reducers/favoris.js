import { combineReducers } from 'redux'
import { RECEIVE_FAVORISPOINT, UPDATE_FAVORIS_TYPE_MAP, UPDATE_FAVORIS_ID_MAP } from '../constants/actionTypes'

//reducer for favoris point
const favorisIdMap = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FAVORISPOINT:
      return action.favorisIdMap
      case UPDATE_FAVORIS_ID_MAP:
        return {
          ...state,
          [action.key]: action.value
        }
    default:
      return state
  }
}
const favorisTypeMap = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FAVORISPOINT:
      return action.favorisTypeMap
    case UPDATE_FAVORIS_TYPE_MAP:
      return {
        ...state,
        [action.key]: action.value
      }
    default:
      return state
  }
}
export default combineReducers({
  favorisIdMap,
  favorisTypeMap
})
