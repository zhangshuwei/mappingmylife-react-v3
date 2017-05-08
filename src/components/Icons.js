import L from 'leaflet'
import '../../node_modules/drmonty-leaflet-awesome-markers/css/leaflet.awesome-markers.css'
import '../../node_modules/drmonty-leaflet-awesome-markers/js/leaflet.awesome-markers.min.js'

export const geoIcon = L.AwesomeMarkers.icon({
  icon: 'street-view',
  markerColor: 'orange',
  prefix: 'fa'
})
export const phoneIcon = L.AwesomeMarkers.icon({
  icon: 'phone',
  markerColor: 'blue',
  prefix: 'fa'
})
export const homeIcon = L.AwesomeMarkers.icon({
  icon: 'home',
  markerColor: 'purple',
  prefix: 'fa'
})
export const workIcon = L.AwesomeMarkers.icon({
  icon: 'briefcase',
  markerColor: 'darktred',
  prefix: 'fa'
})
export const shopIcon = L.AwesomeMarkers.icon({
  icon: 'shopping-cart',
  markerColor: 'darkblue',
  prefix: 'fa'
})
export const sportIcon = L.AwesomeMarkers.icon({
  icon: 'futbol-o',
  markerColor: 'green',
  prefix: 'fa'
})
export const otherIcon = L.AwesomeMarkers.icon({
  icon: 'star',
  markerColor: 'darkpurple',
  prefix: 'fa'
})
