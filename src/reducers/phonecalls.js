import {
  RECEIVE_PHONECALLS
} from '../constants/actionTypes'

// reducer for phonecalls
const phonecalls = (state = { phonecalls: [] }, action) => {
  switch (action.type) {
    case RECEIVE_PHONECALLS:
      return {
        ...state,
        phonecalls: action.phonecalls
      }
    default:
      return state
  }
}
export default phonecalls
