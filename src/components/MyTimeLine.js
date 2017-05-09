import React, { Component } from 'react'
import '../../node_modules/moment/min/moment-with-locales'
import '../../node_modules/moment/locale/fr'
import Timeline from 'react-visjs-timeline'
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
const groups = [
  {id: 0, content: 'GeoLocation', value: 1, order: 1, className: 'GEOLOCITEM'},
  {id: 1, content: 'PhoneCommunication', value: 2, order: 2, className: 'PHONECALLITEM'}
]

class MyTimeLine extends Component {
  render () {
    console.log(timelineOptions.locale)

    return (
      <div>
        <Timeline options={timelineOptions} groups={groups} />
      </div>
    )
  }
}
export default MyTimeLine
