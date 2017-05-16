/**
  Redux constants
**/

// global variables
export const GEOLOCATION_DOCTYPE = 'fr.orange.geopoint'
export const MAPBOXTOKEN = 'pk.eyJ1IjoibGlzYTI5NiIsImEiOiJjajFka2w2Y2EwMDB6Mnl0am1ka280aGZ0In0.XFblnQ25U42unrYlRrf5Fg'
export const MAPBOXURL = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=' + MAPBOXTOKEN
export const GEOITEM = 'geoloc'
export const PHONECALLITEM = 'phonecall'
export const PHONEITEM = 'phonecall'
export const TIMELINEOPTIONS = {
  clickToUse: true,
  type: 'point',
  stack: false,
  zoomMax: 1000 * 60 * 60 * 24 * 31 * 12 * 10,
  zoomMin: 1000 * 60,
  showCurrentTime: false,
  editable: false,
  orientation: 'top',
  locale: 'fr',
  tooltip: {
    followMouse: true,
    overflowMethod: 'cap'
  }}
export const TIMELINEGROUPS = [
  {id: 0, content: 'GeoLocation', value: 1, order: 1, className: GEOITEM},
  {id: 1, content: 'PhoneCommunication', value: 2, order: 2, className: PHONECALLITEM}
]
