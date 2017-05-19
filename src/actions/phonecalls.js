/* global cozy */

import {
  RECEIVE_PHONECALLS,
  FETCH_PHONECALLS_FAILURE
} from '../constants/actionTypes'
import { PHONECALL_DOCTYPE } from '../constants/config'

export const receivePhonecalls = (phonecalls) => ({
  type: RECEIVE_PHONECALLS,
  phonecalls
})

export const fetchPhonecalls = (phoneIndexByDate, start, end) => {
  return async dispatch => {
    const options = {
      'selector': {
        'docType': PHONECALL_DOCTYPE,
        '$and': [
          {
            'timestamp': {'$gt': start}
          },
          {
            'timestamp': {'$lte': end + 'T23:59:59Z'}
          },
          {
            'latitude': {'$ne': 'NULL'}
          },
          {
            'longitude': {'$ne': 'NULL'}
          }
        ]},
      'fields': ['_id', 'timestamp', 'latitude', 'longitude', 'msisdn', 'type', 'partner'],
      'descending': true,
      'limit': 10000
    }
    return cozy.client.data.query(phoneIndexByDate, options)
    .then((phonecalls) => {
      dispatch(receivePhonecalls(phonecalls))
      return phonecalls
    })
    .catch((error) => {
      dispatch({
        type: FETCH_PHONECALLS_FAILURE,
        error
      })
    })
  }
}
export const fetchPhonecallsLatest = (phoneIndexByDate) => {
  return async dispatch => {
    const options = {
      'selector': {
        'docType': PHONECALL_DOCTYPE,
        '$and': [
          {
            'latitude': {'$ne': 'NULL'}
          },
          {
            'longitude': {'$ne': 'NULL'}
          }
        ]
      },
      'fields': ['_id', 'timestamp', 'latitude', 'longitude', 'msisdn', 'type', 'partner'],
      'descending': true,
      'limit': 30
    }
    return cozy.client.data.query(phoneIndexByDate, options)
    .then((phonecalls) => {
      dispatch(receivePhonecalls(phonecalls))
      return phonecalls
    })
    .catch((error) => {
      dispatch({
        type: FETCH_PHONECALLS_FAILURE,
        error
      })
    })
  }
}
