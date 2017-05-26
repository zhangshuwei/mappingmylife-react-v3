import React, { Component } from 'react'
import { Map, Marker, TileLayer, Popup } from 'react-leaflet'
import L from 'leaflet'
import _ from 'lodash'
import { MAPBOXURL } from '../constants/config'
import { geoIcon, phoneIcon, homeIcon, workIcon, sportIcon, shopIcon, otherIcon } from './Icons'
import { Button } from 'react-bootstrap'
import 'leaflet-css'
import '../styles/map.css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

class FavorisMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showPopup: false,
      center: [48.866667, 2.333333]
    }
    this.showInfo = this.showInfo.bind(this)
    this.renderGeoMarkers = this.renderGeoMarkers.bind(this)
    this.renderPhoneMarkers = this.renderPhoneMarkers.bind(this)
    this.getIconType = this.getIconType.bind(this)
  }
  showInfo () {
    this.setState({
      showPopup: !this.state.showPopup
    })
  }
  getIconType (latitude, longitude, defaultIcon) {
    let key = latitude.toString() + longitude.toString()
    let typeIcon = defaultIcon
    if (!(_.isEmpty(this.props.favorisPoint))) {
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
  renderGeoMarkers (geoLog) {
    if (geoLog.length > 0) {
      return geoLog.map((item, i) => {
        let typeIcon = this.getIconType(item.latitude, item.longitude, geoIcon)
        return (
          <Marker key={i} position={[item.latitude, item.longitude]} icon={typeIcon} onClick={this.props.changeLatLng}>
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
      return <p>error</p>
    }
  }
  renderPhoneMarkers (phoneLog) {
    if (phoneLog.length > 0) {
      return phoneLog.map((item, i) => {
        let typeIcon = this.getIconType(item.latitude, item.longitude, phoneIcon)
        return (
          <Marker key={i} position={[item.latitude, item.longitude]} icon={typeIcon} onClick={this.props.changeLatLng}>
            <Popup>
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
      return <p>error</p>
    }
  }

  render () {
    const {geolocations, phonecalls} = this.props
    const geomarkers = this.renderGeoMarkers(geolocations)
    const phonemarkers = this.renderPhoneMarkers(phonecalls)

    return (
      <div>
        <Map center={this.state.center} zoom={13} maxZoom={18}>
          <TileLayer
            url={MAPBOXURL}
            maxZoom={18}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {geomarkers}
          {phonemarkers}
        </Map>

      </div>
    )
  }
}

export default FavorisMap
