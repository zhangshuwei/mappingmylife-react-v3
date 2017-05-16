/* global cozy */

import {
  FETCH_GEO_LAST_DAY,
  FETCH_GEOLOCATIONS_FAILURE
} from '../constants/actionTypes'
import { GEOLOCATION_DOCTYPE } from '../constants/config'
import { fetchGeolocations } from './geolocations'

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
        date: date[0].timestamp.slice(0, 10)
      })
      dispatch(fetchGeolocations(mangoIndexByDate, date[0].timestamp.slice(0, 10), date[0].timestamp.slice(0, 10)))
      // return date[0].timestamp.slice(0,10)
    })
    .catch((error) => {
      dispatch({
        type: FETCH_GEOLOCATIONS_FAILURE,
        error
      })
    })
  }
}

export const selectDate = (start, end, mangoIndexByDate) => {
  return async dispatch => {
    dispatch({
      type: 'SELECT_DATE',
      date: {
        start: start,
        end: end
      }
    })
    dispatch(fetchGeolocations(mangoIndexByDate, start, end))
  }
}
