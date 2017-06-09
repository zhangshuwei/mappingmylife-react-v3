import React, { Component } from 'react'
import L from 'leaflet'
import { MAPBOXURL } from '../constants/config'
import { startIcon, endIcon } from './Icons'
import _ from 'lodash'
import 'leaflet-polylinedecorator'
import 'leaflet-css'
import '../styles/map.css'

let map = {}
let mapLayers = new L.featureGroup()

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
        maxZoom: 19})
    map = L.map('mymap', { layers: [layers], zoom: this.state.zoom, center: this.state.center })
  }

  renderPath (data) {
    mapLayers.clearLayers()
    if (!_.isEmpty(data)) {
      let latlngs = data.map((item) => {
        return [item.latitude, item.longitude]
      })
      let polyline = new L.polyline(latlngs, {color: '#808080', weight: 2, opacity: 1, smoothFactor: 1})
      let decorator = L.polylineDecorator(polyline)
      let arrowOffset = 0
      let anim = setInterval(function () {
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
      let startPoint = latlngs[0]
      let endPoint = latlngs.slice(-1)[0]
      if(_.isEqual(startPoint, endPoint)) {
        var newStartPoint = [startPoint[0] + 0.0001, startPoint[1]+0.0001]
        console.log(newStartPoint)

      }
      console.log(newStartPoint)
      let startMarker = new L.marker(latlngs[0], {icon: startIcon})
      let endMarker = new L.marker(latlngs.slice(-1)[0], {icon: endIcon})
      mapLayers.addLayer(polyline).addTo(map)
      mapLayers.addLayer(decorator).addTo(map)
      mapLayers.addLayer(startMarker).addTo(map)
      mapLayers.addLayer(endMarker).addTo(map)
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
