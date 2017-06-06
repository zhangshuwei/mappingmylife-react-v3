import React, { Component } from 'react'
import { connect } from 'react-redux'
import L from 'leaflet'
import 'leaflet-polylinedecorator'
import { MAPBOXURL } from '../constants/config'
import { geoIcon, phoneIcon, homeIcon, workIcon, sportIcon, shopIcon, otherIcon } from './Icons'
import _ from 'lodash'
import { Button } from 'react-bootstrap'
import 'leaflet-css'
import '../styles/map.css'

let map = {}
class TraceMap extends Component {
  constructor (props) {
    super(props)
    this.state = {
      center: [48.866667, 2.333333],
      zoom: 13,
      isFirstLoad: true
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
    let data = this.props.geolocations.reverse()

    let latlngs = data.map((item) => {
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
    polyline.addTo(map)
    decorator.addTo(map)
    console.log(polyline)
    console.log(decorator)
  }
  render () {
    if(this.props.geolocations && !this.state.isFirstLoad) {
      this.renderMarker()
    }
    return (
      <div id='mymap'>
      </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    geolocations: state.geolocations.geolocations
  }
}
export default connect(mapStateToProps)(TraceMap)
