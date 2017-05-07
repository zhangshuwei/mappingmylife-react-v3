/* global cozy*/

import {
  RECEIVE_GEOLOCATIONS,
  FETCH_GEOLOCATIONS_FAILURE
} from '../constants/actionTypes'
import { GEOLOCATION_DOCTYPE } from '../constants/config'

export const receiveGeolocations = (geolocations) => ({
  type: RECEIVE_GEOLOCATIONS,
  geolocations
})
// fetch geolocations using the index created by the app
// export const fetchGeolocations = () => dispatch => {
//   return fetch('https://www.reddit.com/r/reactjs.json')
//   .then(response => response.json())
//   .then(json => dispatch(receivePosts(json)))
// }

export const fetchGeolocations = (mangoIndexByDate) => {
  return async dispatch => {
    const options = {
      'selector': {
        'docType': GEOLOCATION_DOCTYPE
      },
      'fields': ['_id', 'timestamp', 'latitude', 'longitude', 'msisdn', 'radius'],
      'descending': true
    }
    return await cozy.client.data.query(mangoIndexByDate, options)
    .then((geolocations) => {
      dispatch(receiveGeolocations(geolocations))
      return geolocations
    })
    .catch((error) => {
      dispatch({
        type: FETCH_GEOLOCATIONS_FAILURE,
        error
      })
    })
  }
}
