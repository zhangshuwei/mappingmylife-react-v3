import React, { Component } from 'react'
import vis from 'vis/dist/vis.min'
import _ from 'lodash'
import { GEOITEM, PHONEITEM, TIMELINEOPTIONS, TIMELINEGROUPS } from '../constants/config'
import '../../node_modules/vis/dist/vis.min.css'
import '../styles/timeLine.css'

let timeline = {}
let items = []
const renderGeoItems = (items) => {
  let data = []
  if (items.length > 0) {
    items.map((item) => (
      data.push({
        id: item._id,
        start: item.timestamp.replace(/T|Z/g, ' '),
        group: 0,
        className: GEOITEM,
        title: '<div classNme="data-tooltip"><p>Position: (' + item.latitude + ', ' +
              item.longitude + ')</p><p>Timestamp: ' + item.timestamp.replace(/T|Z/g, ' ') + '</div>'
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
        id: item._id,
        start: item.timestamp.replace(/T|Z/g, ' '),
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
const move = (percentage) => {
  var range = timeline.getWindow()
  var interval = range.end - range.start
  timeline.setWindow({
    start: range.start.valueOf() - interval * percentage,
    end: range.end.valueOf() - interval * percentage
  })
}
class TimeLine extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isFirstFetch: true
    }
    this.onSelectDataByDate = this.onSelectDataByDate.bind(this)
    this.initTimeline = this.initTimeline.bind(this)
  }
  componentDidMount () {
    let idname = document.getElementById('mytimeline')
    this.initTimeline()
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if((_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state))) {
  //     console.log('************************** is equal')
  //   }
  //    return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state))
  // }
  componentWillUnmount () {
    timeline.off('rangechanged', this.onSelectDataByDate)
  }
  onSelectDataByDate (properties) {
    if (properties.byUser) {
      let start = formatDate(timeline.getWindow().start)
      let end = formatDate(timeline.getWindow().end)
      let geoIndexByDate = this.props.mango.geolocationsIndexByDate
      let phoneIndexByDate = this.props.mango.phonecallsIndexByDate
      this.props.selectDataByDate(start, end, geoIndexByDate, phoneIndexByDate)
    }
  }

  initTimeline () {
    let container = document.getElementById('mytimeline')
    timeline = new vis.Timeline(container, items, TIMELINEGROUPS, TIMELINEOPTIONS)
    timeline.addEventListener('rangechanged', this.onSelectDataByDate)
  }

  render () {
    const { geolocations, phonecalls } = this.props
    let geoItems = renderGeoItems(geolocations)
    let phoneItems = renderPhoneItems(phonecalls)
    items = [...geoItems, ...phoneItems]
    if (geoItems.length > 0 && phoneItems.length > 0) {
        timeline.setItems(items)
        if (_.isEmpty(this.props.date)) {
          let startDay = (geoItems[geoItems.length - 1].start > phoneItems[phoneItems.length - 1].start) ? phoneItems[phoneItems.length - 1].start : geoItems[geoItems.length - 1].start
          let lastDay = (geoItems[0].start > phoneItems[0].start) ? geoItems[0].start : phoneItems[0].start
          timeline.setWindow(startDay, lastDay)
        }
    }
    return (
      <div>
        <div id='mytimeline' />
      </div>
    )
  }
}
export default TimeLine

export const zoomInTimeLine = () => {
  timeline.zoomIn(0.2)
}

export const zoomOutTimeLine = () => {
  timeline.zoomOut(0.2)
}

export const moveLeftTimeLine = () => {
  move(0.2)
}
export const moveRightTimeLine = () => {
  move(-0.2)
}
