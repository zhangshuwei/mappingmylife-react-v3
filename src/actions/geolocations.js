/* global cozy */

import {
  RECEIVE_GEOLOCATIONS,
  FETCH_GEOLOCATIONS_FAILURE
} from '../constants/actionTypes'

export const receiveGeolocations = (geolocations) => ({
  type: RECEIVE_GEOLOCATIONS,
  geolocations
})
const fetchMoreGeolocations = (geoIndexByDate, start, end, skip, previousData) => {
  const options = {
    selector: {
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
        },
        {
          'latitude': {'$ne': ''}
        },
        {
          'longitude': {'$ne': ''}
        }
      ]},
    fields: ['_id', 'timestamp', 'latitude', 'longitude', 'msisdn', 'radius'],
    descending: true,
    wholeResponse: true,
    skip: skip
  }
  return cozy.client.data.query(geoIndexByDate, options)
  .then((geolocations) => {
    if (geolocations) {
      let hasNext = geolocations.next
      let data = [...geolocations.docs, ...previousData]
      let result = {'hasNext': hasNext, 'data': data}
      return result
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

const loop = (geoIndexByDate, start, end, skip, data) => {
  return fetchMoreGeolocations(geoIndexByDate, start, end, skip, data)
  .then(
    result => {
      if (result.hasNext) {
        return loop(geoIndexByDate, start, end, result.data.length, result.data)
      } else {
        return result
      }
    }
  )
  .catch((error) => {
    console.log(error)
  })
}

export const fetchGeolocations = (geoIndexByDate, start, end) => {
  return async dispatch => {
    const options = {
      selector: {
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
          },
          {
            'latitude': {'$ne': ''}
          },
          {
            'longitude': {'$ne': ''}
          }
        ]},
      fields: ['_id', 'timestamp', 'latitude', 'longitude', 'msisdn', 'radius'],
      descending: true,
      wholeResponse: true
    }
    return cozy.client.data.query(geoIndexByDate, options)
    .then((geolocations) => {
      let data = geolocations.docs
      let hasMore = geolocations.next
      if (hasMore) {
        let res = loop(geoIndexByDate, start, end, data.length, data)
        res.then(
          (result) => {
            dispatch(receiveGeolocations(result.data))
          }
        )
        res.catch((error) => {
          dispatch({
            type: FETCH_GEOLOCATIONS_FAILURE,
            error
          })
        })
      } else {
        dispatch(receiveGeolocations(data))
      }
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
      selector: {
        '$and': [
          {
            'timestamp': {'$gt': null}
          },
          {
            'latitude': {'$ne': 'NULL'}
          },
          {
            'longitude': {'$ne': 'NULL'}
          },
          {
            'latitude': {'$ne': ''}
          },
          {
            'longitude': {'$ne': ''}
          }
        ]},
      fields: ['_id', 'timestamp', 'latitude', 'longitude', 'msisdn', 'radius'],
      descending: true,
      limit: 30
    }
    return cozy.client.data.query(geoIndexByDate, options)
    .then((geolocations) => {
      dispatch(receiveGeolocations(geolocations))
    })
    .catch((error) => {
      dispatch({
        type: FETCH_GEOLOCATIONS_FAILURE,
        error
      })
    })
  }
}
