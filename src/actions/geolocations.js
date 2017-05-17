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

export const fetchGeolocations = (mangoIndexByDate, start, end) => {
  return async dispatch => {
    const options = {
      'selector': {
        'docType': GEOLOCATION_DOCTYPE,
        '$and': [
          {
            'timestamp': {'$gt': start}
          },
          {
            'timestamp': {'$lte': end + 'T23:59:59Z'}
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
export const fetchGeoLatest = (geoIndexByDate) => {
  return async dispatch => {
    const options = {
      'selector': {
        'docType': GEOLOCATION_DOCTYPE
      },
      'fields': ['_id', 'timestamp', 'latitude', 'longitude', 'msisdn', 'radius'],
      'descending': true,
      'limit': 30
    }
    return cozy.client.data.query(geoIndexByDate, options)
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
