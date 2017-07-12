/* global $ */
import { RECEIVE_TOP_GEOLOCATIONS, RECEIVE_TOP_PHONECALLS, FETCH_TOP_GEOLOCATIONS_FAILURE, FETCH_TOP_PHONECALLS_FAILURE } from '../constants/actionTypes'
import { GEOLOCATION_DOCTYPE, PHONECALL_DOCTYPE } from '../constants/config'
import orderBy from 'lodash/orderBy'
import reduce from 'lodash/reduce'

const applicationElement = document.querySelector('[role=application]')
const cozyOptions = {
  cozyURL: `//${applicationElement.dataset.cozyDomain}`,
  token: applicationElement.dataset.cozyToken
}
const PROTOCOL = window.location.protocol

const getPhoneCommunicationLogURL = PROTOCOL + cozyOptions.cozyURL + '/data/' + PHONECALL_DOCTYPE + '/_all_docs?include_docs=true'
const getGeoPointURL = PROTOCOL + cozyOptions.cozyURL + '/data/' + GEOLOCATION_DOCTYPE + '/_all_docs?include_docs=true'

export const receiveTopGeolocations = (topGeolocations) => ({
  type: RECEIVE_TOP_GEOLOCATIONS,
  topGeolocations: topGeolocations
})

export const receiveTopPhonecalls = (topPhonecalls) => ({
  type: RECEIVE_TOP_PHONECALLS,
  topPhonecalls: topPhonecalls
})

const getTopGeoValue = (values) => {
  let result = reduce(values, function (result, value) {
    ((result[(value.doc.latitude).toString() + ',' + (value.doc.longitude).toString()]) || (result[(value.doc.latitude).toString() + ',' + (value.doc.longitude).toString()] = [])).push(
      {
        start: value.doc.timestamp.replace(/T|Z/g, ' '),
        msisdn: value.doc.msisdn,
        _id: value.doc._id
      })
    return result
  }, [])
  let geoLog = []
  for (let key in result) {
    if (result.hasOwnProperty(key)) {
      let item = {}
      item.latitude = Number(key.split(',')[0])
      item.longitude = Number(key.split(',')[1])
      item.geoInfo = result[key]
      geoLog.push(item)
    }
  }
  geoLog = orderBy(geoLog, ['geoInfo'], ['desc'])
  return geoLog.slice(0, 5)
}
const getTopPhoneValue = (values) => {
  let result = reduce(values, function (result, value) {
    ((result[(value.doc.latitude).toString() + ',' + (value.doc.longitude).toString()]) || (result[(value.doc.latitude).toString() + ',' + (value.doc.longitude).toString()] = [])).push(
      {
        start: value.doc.timestamp.replace(/T|Z/g, ' '),
        msisdn: value.doc.msisdn,
        partner: value.doc.partner,
        typeMessage: value.doc.type,
        _id: value.doc._id
      })
    return result
  }, [])
  let phoneLog = []
  for (let key in result) {
    if (result.hasOwnProperty(key)) {
      let item = {}
      item.latitude = Number(key.split(',')[0])
      item.longitude = Number(key.split(',')[1])
      item.phoneInfo = result[key]
      phoneLog.push(item)
    }
  }
  phoneLog = orderBy(phoneLog, ['phoneInfo'], ['desc'])
  return phoneLog.slice(0, 5)
}
export const fetchTopGeolocations = () => {
  return dispatch => {
    $.ajax(getGeoPointURL, {
      type: 'GET',
      beforeSend: function (request) {
        request.setRequestHeader('Authorization', 'Bearer ' + cozyOptions.token)
      },
      dataType: 'json',
      success: (data) => {
        let result = []
        if (data && data.rows) {
          result = data.rows.filter(function (obj) {
            return obj.doc.latitude !== 'NULL' && obj.doc.latitude !== '' &&
            obj.doc.longitude !== 'NULL' && obj.doc.longitude !== '' && obj.doc.latitude !== undefined &&
            obj.doc.longitude !== undefined
          })
        }
        let topGeolocations = getTopGeoValue(result)
        dispatch(receiveTopGeolocations(topGeolocations))
      },
      error: (error) => {
        dispatch({
          type: FETCH_TOP_GEOLOCATIONS_FAILURE,
          error
        })
      }
    })
  }
}
export const fetchTopPhonecalls = () => {
  return dispatch => {
    $.ajax(getPhoneCommunicationLogURL, {
      type: 'GET',
      beforeSend: function (request) {
        request.setRequestHeader('Authorization', 'Bearer ' + cozyOptions.token)
      },
      dataType: 'json',
      success: (data) => {
        let result = []
        if (data && data.rows) {
          result = data.rows.filter(function (obj) {
            return obj.doc.latitude !== 'NULL' && obj.doc.latitude !== '' &&
            obj.doc.longitude !== 'NULL' && obj.doc.longitude !== '' && obj.doc.latitude !== undefined &&
            obj.doc.longitude !== undefined
          })
        }
        let topPhonecalls = getTopPhoneValue(result)
        dispatch(receiveTopPhonecalls(topPhonecalls))
      },
      error: (error) => {
        dispatch({
          type: FETCH_TOP_PHONECALLS_FAILURE,
          error
        })
      }
    })
  }
}
// export const fetchTopGeolocations = (geoIndexByDate) => {
//   return async dispatch => {
//     const options = {
//       selector: {
//         docType: GEOLOCATION_DOCTYPE
//       },
//       fields: ['_id', 'timestamp', 'latitude', 'longitude', 'msisdn', 'radius'],
//       descending: true,
//       limit: 10000
//     }
//     return cozy.client.data.query(geoIndexByDate, options)
//     .then((topGeo) => {
//       let topGeolocations = getTopGeoValue(topGeo)
//       dispatch(receiveTopGeolocations(topGeolocations))
//       return topGeolocations
//     })
//     .catch((error) => {
//       dispatch({
//         type: FETCH_TOP_GEOLOCATIONS_FAILURE,
//         error
//       })
//     })
//   }
// }
// export const fetchTopPhonecalls_old = (phoneIndexByDate) => {
//   return async dispatch => {
//     const options = {
//       selector: {
//         docType: PHONECALL_DOCTYPE,
//         '$and': [
//           {
//             'latitude': {'$ne': 'NULL'}
//           },
//           {
//             'longitude': {'$ne': 'NULL'}
//           },
//           {
//             'latitude': {'$ne': ''}
//           },
//           {
//             'longitude': {'$ne': ''}
//           }
//         ]
//       },
//       limit: 10000,
//       descending: true,
//       fields: ['_id', 'timestamp', 'latitude', 'longitude', 'msisdn', 'type', 'partner']
//
//     }
//     return cozy.client.data.query(phoneIndexByDate, options)
//     .then((topPhone) => {
//       let topPhonecalls = getTopPhoneValue(topPhone)
//       dispatch(receiveTopPhonecalls(topPhonecalls))
//       return topPhonecalls
//     })
//     .catch((error) => {
//       dispatch({
//         type: FETCH_TOP_PHONECALLS_FAILURE,
//         error
//       })
//     })
//   }
// }
