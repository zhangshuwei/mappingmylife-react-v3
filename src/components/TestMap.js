import React, { Component } from 'react'
import { Map, Marker, TileLayer } from 'react-leaflet'
import { MAPBOXURL } from '../constants/config'
import 'leaflet-css'
import './Style.css'
import L from 'leaflet'
import { geoIcon } from './Icons'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

class TestMap extends Component {
  render () {
    return (
      <div>
        <Map center={[48.866667, 2.333333]} zoom={13} maxZoom={19}>
          <TileLayer
            url={MAPBOXURL}
            maxZoom={19}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={[48.866667, 2.333333]} icon={geoIcon} />
        </Map>
      </div>)
  }
}

export default TestMap
