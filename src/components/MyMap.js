import React, { Component } from 'react'
import { Map, Marker, TileLayer,Popup } from 'react-leaflet'
import L from 'leaflet'
import {MAPBOXURL} from '../constants/config'
import { geoIcon } from './Icons'
import { reduce } from 'lodash'
import { Button } from 'react-bootstrap'
import '../styles/map.css'
import 'leaflet-css'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

class MyMap extends Component {
  constructor(props) {
    super (props)
    this.state = {
      showPopup: false
    }
    this.showInfo = this.showInfo.bind(this)
  }
  showInfo = () => {
   this.setState({
     showPopup: !this.state.showPopup
   })
  }
  renderMarkers = (geolocations) => {
    let result = _.reduce(geolocations, function(result, value) {
        ((result[(value.latitude).toString() + ',' + (value.longitude).toString()]) || (result[(value.latitude).toString() + ',' + (value.longitude).toString()] = [])).push(
          {
          start: value.timestamp.replace(/T|Z/g, " "),
          msisdn: value.msisdn,
          _id: value._id
        })
        return result
      }, [])
    let geoLog = []
    for( let key in result) {
      if(result.hasOwnProperty(key)) {
        let item = {}
        item.latitude = Number(key.split(',')[0])
        item.longitude = Number(key.split(',')[1])
        item.geoInfo = result[key]
        geoLog.push(item)
      }
    }

    if (geoLog.length > 0) {
      return geoLog.map((item, i) =>
        <Marker key={i} position={[item.latitude, item.longitude]} icon={geoIcon}>
          <Popup>
           <div>
             <h4>Nombre de geolocation = {item.geoInfo.length}</h4>
             <div id="#info" style={{display: this.state.showPopup ? 'block' : 'none' }}>
             {
              item.geoInfo.map((item, i) =>
                <p key={i}>Timestamp: {item.start}</p>
              )
            }
            </div>
            <Button bsSize='small' bsStyle='success' onClick={this.showInfo}>{this.state.showPopup ? 'Cache': 'Afficher'}</Button>
           </div>
         </Popup>
        </Marker>

    )
    } else {
      return <p>error</p>
    }
  }

  render () {
    const geolocations = this.props
    const markers = this.renderMarkers(geolocations.geolocations)

    return (
      <div>
        <Map center={[48.866667, 2.333333]} zoom={13} maxZoom={18}>
          <TileLayer
            url={MAPBOXURL}
            maxZoom={18}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers}
        </Map>

      </div>)
  }
}

export default MyMap
