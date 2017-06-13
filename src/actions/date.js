/* global cozy */

import { FETCH_GEO_LAST_DAY, FETCH_GEOLOCATIONS_FAILURE, SELECT_DATE } from '../constants/actionTypes'
import { GEOLOCATION_DOCTYPE } from '../constants/config'
import { fetchGeolocations } from './geolocations'
import { fetchPhonecalls } from './phonecalls'

export const fetchGeoLastDay = (geoIndexByDate) => {
  return async dispatch => {
    const options = {
      'selector': {
        'docType': GEOLOCATION_DOCTYPE
      },
      'fields': ['_id', 'timestamp'],
      'descending': true,
      'limit': 1
    }
    return cozy.client.data.query(geoIndexByDate, options)
    .then((date) => {
      dispatch({
        type: FETCH_GEO_LAST_DAY,
        date: date[0].timestamp.slice(0, 10)
      })
      return date
    })
    .catch((error) => {
      dispatch({
        type: FETCH_GEOLOCATIONS_FAILURE,
        error
      })
    })
  }
}

export const selectDataByDate = (start, end, geoIndexByDate, phoneIndexByDate) => {
  return async dispatch => {
    dispatch({
      type: SELECT_DATE,
      date: {
        start: start,
        end: end
      }
    })
    dispatch(fetchGeolocations(geoIndexByDate, start, end))
    dispatch(fetchPhonecalls(phoneIndexByDate, start, end))
  }
}

export const initDate = () => ({
  type: SELECT_DATE,
  date: {
    start: '',
    end: ''
  }
})
