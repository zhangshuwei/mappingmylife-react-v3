/* global cozy */

import {
  RECEIVE_GEOLOCATIONS,
  FETCH_GEOLOCATIONS_FAILURE
} from '../constants/actionTypes'
import { GEOLOCATION_DOCTYPE } from '../constants/config'

export const receiveGeolocations = (geolocations) => ({
  type: RECEIVE_GEOLOCATIONS,
  geolocations
})

export const fetchGeolocations = (mangoIndexByDate) => {
  return async dispatch => {
    const options = {
      'selector': {
        'docType': GEOLOCATION_DOCTYPE,
        '$and': [
          {
            'timestamp': {'$gt': '2016-11-18'}
          },
          {
            'timestamp': {'$lt': '2016-11-19'}
          }
        ]},
      'fields': ['_id', 'timestamp', 'latitude', 'longitude', 'msisdn', 'radius'],
      'descending': true,
      'limit': 10000
    }
    return cozy.client.data.query(mangoIndexByDate, options)
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
