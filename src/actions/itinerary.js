/* global cozy */

import {FETCH_ITINERARY} from '../constants/actionTypes'
import { GEOLOCATION_DOCTYPE } from '../constants/config'
import isEmpty from 'lodash/isEmpty'
const getPathData = (mangoIndexByDate, startDate) => {
  return async dispatch => {
    const options = {
      selector: {
        '$and': [
          {
            'timestamp': {'$gt': startDate}
          },
          {
            'timestamp': {'$lte': startDate + 'T23:59:59Z'}
          }
        ]},
      fields: ['_id', 'timestamp', 'latitude', 'longitude']
    }
    return cozy.client.data.query(mangoIndexByDate, options)
    .then((data) => {
      if (data) {
        dispatch(receiveData(data))
      }
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
const indexByDate = async () => {
  const fields = ['timestamp']
  return cozy.client.data.defineIndex(GEOLOCATION_DOCTYPE, fields)
}
export const fetchPath = (mangoIndexByDate, startDate) => {
  if (isEmpty(mangoIndexByDate)) {
    return async dispatch => {
      return indexByDate()
        .then(indexByDate => {
          dispatch(getPathData(indexByDate, startDate))
        })
    }
  } else {
    return async dispatch => {
      dispatch(getPathData(mangoIndexByDate, startDate))
    }
  }
}
