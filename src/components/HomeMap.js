import React, { Component } from 'react'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import L from 'leaflet'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import {MAPBOXURL} from '../constants/config'
import { geoIcon, phoneIcon, homeIcon, workIcon, sportIcon, shopIcon, otherIcon } from './Icons'
import isEmpty from 'lodash/isEmpty'
import reduce from 'lodash/reduce'
import { Button } from 'react-bootstrap'
import 'leaflet-css'
import '../styles/map.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

class HomeMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPopup: false,
    }
    this.renderGeoMarkers = this.renderGeoMarkers.bind(this)
    this.renderPhoneMarkers = this.renderPhoneMarkers.bind(this)
    this.getIconType = this.getIconType.bind(this)
    this.showInfo = this.showInfo.bind(this)
  }

  showInfo () {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }
  
  // bindMarker = (ref) => {
  //   if (ref) {
  //     this.props.onSelectMarkers(ref.leafletElement)
  //   }
  // }

  getIconType (latitude, longitude, defaultIcon) {
    let key = latitude.toString() + longitude.toString()
    let typeIcon = defaultIcon
    if (!(isEmpty(this.props.favorisPoint))) {
      if (this.props.favorisPoint[key] !== undefined && this.props.favorisPoint[key]['category'] !== undefined) {
        let category = this.props.favorisPoint[key]['category']
        switch (category) {
          case 'maison':
            typeIcon = homeIcon
            break
          case 'travail':
            typeIcon = workIcon
            break
          case 'sport':
            typeIcon = sportIcon
            break
          case 'marche':
            typeIcon = shopIcon
            break
          default:
            typeIcon = otherIcon
        }
      }
    }
    return typeIcon
  }
  renderGeoMarkers (geolocations) {
    if (geolocations.length > 0) {
      let result = reduce(geolocations, function (result, value) {
        ((result[(value.latitude).toString() + ',' + (value.longitude).toString()]) || (result[(value.latitude).toString() + ',' + (value.longitude).toString()] = [])).push(
          {
            start: value.timestamp.replace(/T|Z/g, ' '),
            msisdn: value.msisdn,
            _id: value._id
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
      if (geoLog.length > 0) {
        return geoLog.map((item, i) => {
          let typeIcon = this.getIconType(item.latitude, item.longitude, geoIcon)
          return (
            //<Marker ref={this.bindMarker} key={i} position={[item.latitude, item.longitude]} icon={typeIcon}>
            <Marker key={i} position={[item.latitude, item.longitude]} icon={typeIcon}>
              <Popup>
                <div>
                  <h5>Nombre de geolocation = {item.geoInfo.length}</h5>
                  <div style={{ display: this.state.showPopup ? 'block' : 'none' }} className='popupContent'>
                    {item.geoInfo.map((item, i) =>
                      <div key={i} className='geoPopup'>
                        <p >Timestamp: {item.start}</p>
                      </div>
                  )}
                  </div>
                  <Button bsSize='small' bsStyle='success' onClick={this.showInfo}>{this.state.showPopup ? 'Cache' : 'Afficher'}</Button>
                </div>
              </Popup>
            </Marker>
          )
        }
        )
      } else {
        return []
      }
    }
  }

  renderPhoneMarkers (phonecalls) {
    if (phonecalls.length > 0) {
      let result = reduce(phonecalls, function (result, value) {
        ((result[(value.latitude).toString() + ',' + (value.longitude).toString()]) || (result[(value.latitude).toString() + ',' + (value.longitude).toString()] = [])).push(
          {
            start: value.timestamp.replace(/T|Z/g, ' '),
            msisdn: value.msisdn,
            partner: value.partner,
            typeMessage: value.type,
            _id: value._id
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
      if (phoneLog.length > 0) {
        return phoneLog.map((item, i) => {
          let typeIcon = this.getIconType(item.latitude, item.longitude, phoneIcon)
          //let bindMarker = this.bindMarker
          return (
            // <Marker ref={this.bindMarker} key={i} position={[item.latitude, item.longitude]} icon={typeIcon}>
            <Marker key={i} position={[item.latitude, item.longitude]} icon={typeIcon}>
              <Popup >
                <div>
                  <h5>Nombre de communications = {item.phoneInfo.length}</h5>
                  <div style={{ display: this.state.showPopup ? 'block' : 'none' }} className='popupContent'>
                    {item.phoneInfo.map((item, i) =>
                      <div key={i} className='phonePopup'>
                        <p>Timestamp: {item.start}</p>
                        <p>Numéro de contact: {item.partner}</p>
                        <p>Type d'appel: {item.typeMessage}</p>
                      </div>
                  )}
                  </div>
                  <Button bsSize='small' bsStyle='success' onClick={this.showInfo}>{this.state.showPopup ? 'Cache' : 'Afficher'}</Button>
                </div>
              </Popup>
            </Marker>
          )
        }
      )
      } else {
        return []
      }
    }
  }

  render () {
    // const {geolocations, phonecalls, center, markers, zoom} = this.props
    const {geolocations, phonecalls, center, zoom} = this.props
    if (!isEmpty(geolocations) || !isEmpty(phonecalls)) {
      let geomarkers = []
      let phonemarkers = []
      if (!isEmpty(phonecalls)) {
        phonemarkers = this.renderPhoneMarkers(phonecalls)
      }
      if (!isEmpty(geolocations)) {
        geomarkers = this.renderGeoMarkers(geolocations)
      }
      return (
        // <Map ref='map' center={center} zoom={zoom} maxZoom={20}>
        <Map center={center} zoom={zoom} maxZoom={20}>
          <TileLayer
            url={MAPBOXURL}
            maxZoom={20}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
            <MarkerClusterGroup wrapperOptions={{enableDefaultStyle: true}} >
            {geomarkers}
            {phonemarkers}
            </MarkerClusterGroup>
        </Map>

      )
    } else {
      return (
        <div>
          <Map center={center} zoom={13} maxZoom={20}>
            <TileLayer
              url={MAPBOXURL}
              maxZoom={20}
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
          </Map>
        </div>
      )
    }
  }
}

export default HomeMap
