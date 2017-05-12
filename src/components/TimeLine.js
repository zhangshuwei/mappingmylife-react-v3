import React, { Component } from 'react'
import vis from 'vis/dist/vis.min'
import { GEOITEM, PHONEITEM, TIMELINEOPTIONS, TIMELINEGROUPS } from '../constants/config'
import '../../node_modules/vis/dist/vis.min.css'
import '../styles/timeLine.css'

let items = []
let timeline

const itemsP = [
  {id: 4, 'longitude': 2.294722, 'latitude': 48.800556, timestamp: '2016-04-16', group: 0, className: PHONEITEM, partner: '3358469874', typeMessage: 'SMS'},
  {id: 5, 'longitude': 2.294722, 'latitude': 48.800556, timestamp: '2016-04-25', group: 0, className: PHONEITEM, partner: '3358469874', typeMessage: 'SMS'},
  {id: 6, 'longitude': 2.294722, 'latitude': 48.800556, timestamp: '2016-04-27', group: 0, className: PHONEITEM, partner: '3358469874', typeMessage: 'SMS'}
]
const renderGeoItems = (items) => {
  let data = []
  if (items.length > 0) {
    items.map((item) => (
      data.push({
        id: item.id,
        start: item.timestamp,
        group: 0,
        className: GEOITEM,
        title: '<div classNme="data-tooltip"><p>Position: (' + item.latitude + ', ' +
              item.longitude + ')</p><p>Timestamp: ' + item.timestamp + '</div>'
      })
    ))
  }
  return data
}
const renderPhoneItems = (items) => {
  let data = []
  if (items.length > 0) {
    items.map((item) => (
      data.push({
        id: item.id,
        start: item.timestamp,
        group: 1,
        className: PHONEITEM,
        title: '<div classNme="data-tooltip"><p>Numéro de contact: ' +
                item.partner + '</p><p>Type d\'appel: ' + item.typeMessage + '</p></div>'
      })
    ))
  }
  return data
}
const formatDate = (date) => {
  let year = date.getFullYear() + ''
  let month = (date.getMonth() + 1) + ''
  let day = date.getDate() + ''
  if (month.length === 1) { month = '0' + month }
  if (day.length === 1) { day = '0' + day }
  return year + '-' + month + '-' + day
}

class TimeLine extends Component {
  constructor (props) {
    super(props)
  }

  onSelectDate = (properties) => {
    if (properties.byUser) {
      let start = formatDate(timeline.getWindow().start)
      let end = formatDate(timeline.getWindow().end)
      this.props.selectDate(start, end)
    }
  }

  initTimeline = () => {
    const { selectDate } = this.props
    let container = document.getElementById('mytimeline')
    timeline = new vis.Timeline(container, items, TIMELINEGROUPS, TIMELINEOPTIONS)
    timeline.addEventListener('rangechanged', this.onSelectDate)
  }

  componentDidMount () {
    this.initTimeline()
  }

  componentWillUnmount() {
    timeline.off('rangechanged', this.onSelectDate)
  }

  render () {
    const { geolocations } = this.props
    let geoItems = renderGeoItems(geolocations)
    let phoneItems = renderPhoneItems(itemsP)
    items = [...geoItems, ...phoneItems]
    console.log(geoItems)
    return (
      <div>
        <div id='mytimeline' />
      </div>
    )
  }
}
export default TimeLine
