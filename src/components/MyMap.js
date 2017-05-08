import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet-css'
import './Style.css'
import L from 'leaflet'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})
function renderMarkers (geolocations) {
  if (geolocations.length > 0) {
    return geolocations.map((item) => (
      <Marker key={item._id} position={[item.latitude, item.longitude]} />
    ))
  }
  else {
    return <p>error</p>
  }
}

class MyMap extends Component {
  render () {
    const geolocations = this.props
    const markers = renderMarkers(geolocations.geolocations)

    return (
      <div>
        <Map center={[48.866667,2.333333]} zoom={13}>
          <TileLayer
            url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {markers}
        </Map>
      </div>)
  }
}

export default MyMap
