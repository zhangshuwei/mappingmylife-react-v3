/* global cozy*/
/**
  Mango index related features (cozy-stack)
**/

import {
  INDEX_GEOLOCATIONS_BY_DATE,
  INDEX_GEOLOCATIONS_BY_DATE_SUCCESS
} from '../constants/actionTypes'

import {
  GEOLOCATION_DOCTYPE
} from '../constants/config'

// Mango: Index files by date (create if not existing) and get its informations
export const indexGeolocationsByDate = () => {
  return async dispatch => {
    dispatch({ type: INDEX_GEOLOCATIONS_BY_DATE })
    const fields = [ 'docType', 'timestamp' ]
    return await cozy.client.data.defineIndex(GEOLOCATION_DOCTYPE, fields)
      .then((mangoIndexByDate) => {
        dispatch({
          type: INDEX_GEOLOCATIONS_BY_DATE_SUCCESS,
          mangoIndexByDate
        })
        return mangoIndexByDate
      })
  }
}
