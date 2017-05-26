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

export const fetchFavorisPoint = (favorisPointIndex) => {
  return async dispatch => {
    const options = {
      selector: {
        category: { '$gt': null }
      },
      fields: ['_id', 'category', 'latitude', 'longitude'],
      limit: 10000
    }
    return cozy.client.data.query(favorisPointIndex, options)
    .then((favorisPoint) => {
      let favorisMap = createFavorisMap(favorisPoint)
      dispatch(receiveFavorisPoint(favorisMap))
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
