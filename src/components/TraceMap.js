import React, { Component } from 'react'
import L from 'leaflet'
import '../../node_modules/leaflet.markercluster/dist/leaflet.markercluster-src'
import { MAPBOXURL } from '../constants/config'
import { startIcon, endIcon } from './Icons'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import uniqWith from 'lodash/uniqWith'
import 'leaflet-polylinedecorator'
import 'leaflet-css'
import '../../node_modules/leaflet.markercluster/dist/MarkerCluster.css'
import '../../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css'
import '../styles/map.css'

let map = {}
let mapLayers = L.featureGroup()
let markers = L.markerClusterGroup()

class TraceMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      center: [48.866667, 2.333333],
      zoom: 13,
      isFirstLoad: true
    }
    this.renderMap = this.renderMap.bind(this)
    this.renderPath = this.renderPath.bind(this)
  }
  componentDidMount () {
    this.renderMap()
  }
  renderMap () {
    let layers = L.tileLayer(MAPBOXURL,
      {attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 20})
    map = L.map('mymap', { layers: [layers], zoom: this.state.zoom, center: this.state.center })
  }

  renderPath (data) {
    mapLayers.clearLayers()
    markers.clearLayers()
    if (!isEmpty(data)) {
      let latlngs = data.map((item) => {
        return [item.latitude, item.longitude]
      })
      if (uniqWith(latlngs, isEqual).length !== 1) {
        let polyline = L.polyline(latlngs, {color: '#808080', weight: 2, opacity: 1, smoothFactor: 1})
        let decorator = L.polylineDecorator(polyline)
        let arrowOffset = 0
        setInterval(function () {
          decorator.setPatterns(
            [{
              offset: arrowOffset + '%',
              repeat: 0,
              symbol: L.Symbol.arrowHead({pixelSize: 17, polygon: true, pathOptions: {stroke: true, color: '#449d44', weight: 4}})}
            ])
          if (++arrowOffset > 100) {
            arrowOffset = 0
          }
        }, 200)
        mapLayers.addLayer(polyline).addTo(map)
        mapLayers.addLayer(decorator).addTo(map)
      }
      let startMarker = L.marker(latlngs[0], {icon: startIcon})
      let endMarker = L.marker(latlngs.slice(-1)[0], {icon: endIcon})
      let startPoint = latlngs[0]
      let endPoint = latlngs.slice(-1)[0]
      if (isEqual(startPoint, endPoint)) {
        markers.addLayer(startMarker)
        markers.addLayer(endMarker)
        map.addLayer(markers)
      } else {
        mapLayers.addLayer(startMarker).addTo(map)
        mapLayers.addLayer(endMarker).addTo(map)
      }
    }
  }

  render () {
    if (this.props.data) {
      this.renderPath(this.props.data)
    }
    return (
      <div id='mymap' />
    )
  }
}

export default TraceMap
