import React, { Component } from 'react'
import vis from 'vis/dist/vis.min'
import { GEOITEM, PHONEITEM } from '../constants/config'
import '../../node_modules/vis/dist/vis.min.css'
import '../styles/timeLine.css'
const timelineOptions = {
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
let items = []
let timeline
const groups = [
  {id: 0, content: 'GeoLocation', value: 1, order: 1, className: GEOITEM},
  {id: 1, content: 'PhoneCommunication', value: 2, order: 2, className: 'phonecall'}
]
const itemsG = [
    {id: 1, 'longitude': 2.294722, 'latitude': 48.800556, timestamp: '2014-04-20', group: 0, className: GEOITEM},
    {id: 2, 'longitude': 2.294722, 'latitude': 48.800556, timestamp: '2014-04-14', group: 0, className: GEOITEM},
    {id: 3, 'longitude': 2.294722, 'latitude': 48.800556, timestamp: '2014-04-18', group: 0, className: GEOITEM}

]
const itemsP = [
  {id: 4, 'longitude': 2.294722, 'latitude': 48.800556, timestamp: '2014-04-16', group: 0, className: PHONEITEM, partner: '3358469874', typeMessage: 'SMS'},
  {id: 5, 'longitude': 2.294722, 'latitude': 48.800556, timestamp: '2014-04-25', group: 0, className: PHONEITEM, partner: '3358469874', typeMessage: 'SMS'},
  {id: 6, 'longitude': 2.294722, 'latitude': 48.800556, timestamp: '2014-04-27', group: 0, className: PHONEITEM, partner: '3358469874', typeMessage: 'SMS'}
]
function renderGeoItems (items) {
  let data = []
  if (items.length > 0) {
    items.map((item) => (
      data.push({
        id: item.id,
        start: item.timestamp,
        group: 0,
        className: item.className,
        title: '<div classNme="data-tooltip"><p>Position: (' + item.latitude + ', ' +
              item.longitude + ')</p><p>Timestamp: ' + item.timestamp + '</div>'
      })
    ))
  }
  return data
}
function renderPhoneItems (items) {
  let data = []
  if (items.length > 0) {
    items.map((item) => (
      data.push({
        id: item.id,
        start: item.timestamp,
        group: 1,
        className: item.className,
        title: '<div classNme="data-tooltip"><p>Numéro de contact: ' +
                item.partner + '</p><p>Type d\'appel: ' + item.typeMessage + '</p></div>'
      })
    ))
  }
  return data
}
function initTimeline () {
  let container = document.getElementById('mytimeline')
  timeline = new vis.Timeline(container, items, groups, timelineOptions)
  // console.log(timeline.getWindow())
}

class TimeLine extends Component {
  componentDidMount () {
    return initTimeline()
  }
  render () {
    let geoItems = renderGeoItems(itemsG)
    let phoneItems = renderPhoneItems(itemsP)
    items = [...geoItems, ...phoneItems]
    return (
      <div>
        <div id='mytimeline' />
      </div>
    )
  }
}
export default TimeLine
