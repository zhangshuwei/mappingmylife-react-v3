/* global cozy */

import {
  FETCH_GEO_LAST_DAY,
  FETCH_GEOLOCATIONS_FAILURE,
  SELECT_DATE
} from '../constants/actionTypes'
import { GEOLOCATION_DOCTYPE } from '../constants/config'

export const fetchGeoLastDay = (mangoIndexByDate) => {
  return async dispatch => {
    const options = {
      'selector': {
        'docType': GEOLOCATION_DOCTYPE
      },
      'fields': ['_id', 'timestamp'],
      'descending': true,
      'limit': 1
    }
    return cozy.client.data.query(mangoIndexByDate, options)
    .then((date) => {
      dispatch({
        type: FETCH_GEO_LAST_DAY,
        date: date[0].timestamp
      })
      return date[0].timestamp
    })
    .catch((error) => {
      dispatch({
        type: FETCH_GEOLOCATIONS_FAILURE,
        error
      })
    })
  }
}

export const selectDate = (start, end) => ({
  type: 'SELECT_DATE',
  date: {
    start: start,
    end: end
  }
})
