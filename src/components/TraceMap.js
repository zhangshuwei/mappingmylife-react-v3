import React, { Component } from 'react'
import L from 'leaflet'
import { MAPBOXURL } from '../constants/config'
import { geoIcon, phoneIcon, homeIcon, workIcon, sportIcon, shopIcon, otherIcon } from './Icons'
import _ from 'lodash'
import { Button } from 'react-bootstrap'
import 'leaflet.polyline.snakeanim'
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
      isFirstLoad: true,
      route:{}
    }
    this.renderMap = this.renderMap.bind(this)
    this.renderMarker = this.renderMarker.bind(this)
  }
  componentDidMount() {
    this.renderMap()
  }
  renderMap () {
    let layers = L.tileLayer(MAPBOXURL,
      {attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      maxZoom:19} )
    map = L.map('mymap', { layers: [layers], zoom: this.state.zoom, center: this.state.center})
    this.setState({
      isFirstLoad: false
    })
  }
  renderMarker () {
    mapLayers.clearLayers()
    let latlngs = this.props.data.map((item) => {
      return [item.latitude, item.longitude]
    })
    let polyline = new L.polyline(latlngs,{color: "#808080",weight: 2,opacity: 1,smoothFactor: 1})
    let decorator = L.polylineDecorator(polyline)
    let arrowOffset = 0
    let anim = setInterval(function() {
        decorator.setPatterns([
            {offset: arrowOffset+'%', repeat: 0, symbol: L.Symbol.arrowHead({pixelSize: 13, polygon: false, pathOptions: {stroke: true, color: "#449d44"}})}
        ]);
        if(++arrowOffset > 100){
            arrowOffset = 0;
        }
    }, 200)
    mapLayers.addLayer(polyline).addTo(map)
    mapLayers.addLayer(decorator).addTo(map)
  }
  renderPath (latlngs) {
    mapLayers.clearLayers()
    let path = []
    for(let i = 0; i < latlngs.length-1; i++) {
      let latlng = [latlngs[i].latitude, latlngs[i].longitude]
      let nextlatlng = [latlngs[i+1].latitude, latlngs[i+1].longitude]
      path.push(L.marker(latlng))
      path.push(L.polyline([latlng, nextlatlng]))
    }
    path.push(L.marker([latlngs[latlngs.length-1].latitude, latlngs[latlngs.length-1].longitude]))
    let route = L.featureGroup(path, { snakingPause: 200 })
    mapLayers.addLayer(route).addTo(map).snakeIn()
  }

  render () {
    if(this.props.data && !this.state.isFirstLoad) {
      // this.renderMarker()
      this.renderPath(this.props.data)
    }
    return (
      <div id='mymap'>
      </div>
    )
  }
}

export default TraceMap
