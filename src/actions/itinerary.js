/* global cozy */

import {FETCH_ITINERARY} from '../constants/actionTypes'
import { GEOLOCATION_DOCTYPE } from '../constants/config'

export const getItinerary = (mangoIndexByDate, startDate) => {
  return async dispatch => {
    const options = {
      selector: {
        docType: GEOLOCATION_DOCTYPE,
        '$and': [
          {
            'timestamp': {'$gt': startDate}
          },
          {
            'timestamp': {'$lte': startDate + 'T23:59:59Z'}
          }
        ]},
      fields: ['_id', 'timestamp', 'latitude', 'longitude'],
      limit: 10000
    }
    return cozy.client.data.query(mangoIndexByDate, options)
    .then((data) => {
      dispatch(receiveData(data))
    })
    .catch((error) => {
      dispatch({
        type: 'FETCH_ITINERARY_FAILURE',
        error
      })
    })
  }
}
const receiveData = (data) => ({
  type: FETCH_ITINERARY,
  path: data
})
