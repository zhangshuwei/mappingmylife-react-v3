import { FETCH_FAVORISPOINT_FAILURE, RECEIVE_FAVORISPOINT, UPDATE_FAVORIS_TYPE_MAP, UPDATE_FAVORIS_ID_MAP } from '../constants/actionTypes'
import { FAVORISPOINT_DOCTYPE } from '../constants/config'

export const receiveFavorisPoint = (favorisIdMap, favorisTypeMap) => ({
  type: RECEIVE_FAVORISPOINT,
  favorisIdMap: favorisIdMap,
  favorisTypeMap: favorisTypeMap
})

const createMapLatlngToId = (favorisPoint) => {
  let favorisIdMap = {}
  favorisPoint.map((item) =>
  favorisIdMap[item.latitude.toString() + item.longitude.toString()] = item._id
  )
  return favorisIdMap
}
const createMapLatlngToType = (favorisPoint) => {
  let favorisTypeMap = {}
  favorisPoint.map((item) =>
  favorisTypeMap[item.latitude.toString() + item.longitude.toString()] = item.category
  )
  return favorisTypeMap
}
export const fetchFavorisPoint = (favorisPointIndex) => {
  return async dispatch => {
    const options = {
      selector: {
        category: {'$gt': null }
        },
      fields: ['_id', 'category', 'latitude', 'longitude'],
      limit: 10000
    }
    return cozy.client.data.query(favorisPointIndex, options)
    .then((favorisPoint) => {
      let favorisIdMap = createMapLatlngToId(favorisPoint)
      let favorisTypeMap = createMapLatlngToType(favorisPoint)
      dispatch(receiveFavorisPoint(favorisIdMap, favorisTypeMap))
    })
    .catch((error) => {
      dispatch({
        type: FETCH_FAVORISPOINT_FAILURE,
        error
      })
    })
  }
}
export const updateFavorisTypeMap = (key, value) => ({
    type: 'UPDATE_FAVORIS_TYPE_MAP',
    key: key,
    value: value
  })

export const updateFavorisIdMap = (key, value) => ({
    type: 'UPDATE_FAVORIS_ID_MAP',
    key: key,
    value: value
  })
