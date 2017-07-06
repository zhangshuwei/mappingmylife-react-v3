/* global cozy */
/**
  Mango index related features (cozy-stack)
**/

import {
  INDEX_GEOLOCATIONS_BY_DATE,
  INDEX_GEOLOCATIONS_BY_DATE_SUCCESS,
  INDEX_PHONECALLS_BY_DATE,
  INDEX_PHONECALLS_BY_DATE_SUCCESS,
  INDEX_FAVORISPOINT,
  INDEX_FAVORISPOINT_SUCCESS,
  CREATE_INDEX_FAILURE
} from '../constants/actionTypes'

import {
  GEOLOCATION_DOCTYPE,
  PHONECALL_DOCTYPE,
  FAVORISPOINT_DOCTYPE
} from '../constants/config'

// Mango: Index data by date (create if not existing) and get its informations
export const indexGeolocationsByDate = () => {
  return dispatch => {
    dispatch({ type: INDEX_GEOLOCATIONS_BY_DATE })
    const fields = ['timestamp']
    return cozy.client.data.defineIndex(GEOLOCATION_DOCTYPE, fields)
      .then((mangoGeoIndexByDate) => {
        dispatch({
          type: INDEX_GEOLOCATIONS_BY_DATE_SUCCESS,
          geoIndex: mangoGeoIndexByDate
        })
        return mangoGeoIndexByDate
      })
      .catch((error) => {
        dispatch({
          type: CREATE_INDEX_FAILURE,
          error
        })
      })
  }
}

export const indexPhonecallsByDate = () => {
  return async dispatch => {
    dispatch({ type: INDEX_PHONECALLS_BY_DATE })
    const fields = ['timestamp']
    return cozy.client.data.defineIndex(PHONECALL_DOCTYPE, fields)
      .then((mangoPhoneIndexByDate) => {
        dispatch({
          type: INDEX_PHONECALLS_BY_DATE_SUCCESS,
          phoneIndex: mangoPhoneIndexByDate
        })
        return mangoPhoneIndexByDate
      })
      .catch((error) => {
        dispatch({
          type: CREATE_INDEX_FAILURE,
          error
        })
      })
  }
}

export const indexFavorisPoint = () => {
  return async dispatch => {
    dispatch({type: INDEX_FAVORISPOINT})
    const fields = ['category']
    return cozy.client.data.defineIndex(FAVORISPOINT_DOCTYPE, fields)
      .then((favorisIndex) => {
        dispatch({
          type: INDEX_FAVORISPOINT_SUCCESS,
          favorisIndex: favorisIndex
        })
        return favorisIndex
      })
      .catch((error) => {
        dispatch({
          type: CREATE_INDEX_FAILURE,
          error
        })
      })
  }
}
