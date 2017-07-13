/* global cozy */

import { FETCH_FAVORISPOINT_FAILURE, RECEIVE_FAVORISPOINT, ADD_FAVORIS_MAP,
  UPDATE_FAVORIS_MAP, DELETE_FAVORIS_MAP } from '../constants/actionTypes'

export const receiveFavorisPoint = (favorisMap) => ({
  type: RECEIVE_FAVORISPOINT,
  favorisMap: favorisMap
})

const createFavorisMap = (favorisPoint) => {
  let favorisMap = {}
  favorisPoint.map((item) => (
    favorisMap[item.latitude.toString() + item.longitude.toString()] = {
      category: item.category,
      id: item._id
    }))
  return favorisMap
}

const fetchMoreFavorisPoint = (favorisPointIndex, skip, previousData) => {
  const options = {
    selector: {
      category: { '$gt': null }
    },
    fields: ['_id', 'category', 'latitude', 'longitude'],
    wholeResponse: true,
    skip: skip
  }
  return cozy.client.data.query(favorisPointIndex, options)
  .then((favorisPoint) => {
    if (favorisPoint) {
      let hasNext = favorisPoint.next
      let data = [...favorisPoint.docs, ...previousData]
      let result = {'hasNext': hasNext, 'data': data}
      return result
    }
  })
  .catch((error) => {
    console.log(error)
  })
}

const loop = (favorisPointIndex, skip, data) => {
  return fetchMoreFavorisPoint(favorisPointIndex, skip, data)
  .then(
    result => {
      if (result.hasNext) {
        return loop(favorisPointIndex, result.data.length, result.data)
      } else {
        return result
      }
    }
  )
  .catch((error) => {
    console.log(error)
  })
}

export const fetchFavorisPoint = (favorisPointIndex) => {
  return async dispatch => {
    const options = {
      selector: {
        category: { '$gt': null }
      },
      fields: ['_id', 'category', 'latitude', 'longitude'],
      wholeResponse: true
    }
    return cozy.client.data.query(favorisPointIndex, options)
    .then((favorisPoint) => {
      console.log(favorisPoint)
      let data = favorisPoint.docs
      let hasMore = favorisPoint.next
      if (hasMore) {
        let res = loop(favorisPointIndex, data.length, data)
        res.then(
          (result) => {
            let favorisMap = createFavorisMap(result.data)
            dispatch(receiveFavorisPoint(favorisMap))
          }
        )
        res.catch((error) => {
          dispatch({
            type: FETCH_FAVORISPOINT_FAILURE,
            error
          })
        })
      } else {
        let favorisMap = createFavorisMap(data)
        dispatch(receiveFavorisPoint(favorisMap))
      }
    })
    .catch((error) => {
      dispatch({
        type: FETCH_FAVORISPOINT_FAILURE,
        error
      })
    })
  }
}

export const addFavorisMap = (key, category, id) => ({
  type: ADD_FAVORIS_MAP,
  key: key,
  category: category,
  id: id
})
export const updateFavorisMap = (key, category, id) => ({
  type: UPDATE_FAVORIS_MAP,
  key: key,
  category: category,
  id: id
})
export const deleteFavorisMap = (key) => ({
  type: DELETE_FAVORIS_MAP,
  key: key
})
