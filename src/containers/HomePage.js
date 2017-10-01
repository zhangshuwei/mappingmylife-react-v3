import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'
import HomeMap from '../components/HomeMap'
import TimeLineView from '../components/TimeLineView'
import { Grid, Row, Col } from 'react-bootstrap'
import findLastIndex from 'lodash/findLastIndex'
import '../styles/rowContent.css'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      center: [48.866667, 2.333333],
      zoom: 13,
      markers: [],
    }
    this.props.actions.indexGeolocationsByDate().then((geoIndexByDate) => this.props.actions.fetchGeoLatest(geoIndexByDate))
    this.props.actions.indexPhonecallsByDate().then((phoneIndexByDate) => this.props.actions.fetchPhonecallsLatest(phoneIndexByDate))
    this.props.actions.indexFavorisPoint()
    this.props.actions.initDate()
    this.onChangeCenter = this.onChangeCenter.bind(this)
    this.onSelectMarkers = this.onSelectMarkers.bind(this)
  }
  // componentDidMount() {
  //   console.log("did mount")
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if((_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state))) {
  //     console.log('************************** is equal')
  //   }
  //    return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state))
  // }
  onChangeCenter (latitude, longitude) {
    console.log("onchangcenter")
    this.setState({
      center: [latitude, longitude],
      zoom: 17
    })
    // let index = findLastIndex(this.state.markers, function (m) { 
    //   return m._latlng.lat == latitude && m._latlng.lng == longitude })
    // console.log("index", index)
    // if (index > -1) {
    //   console.log("openPopup", this.state.markers[index])
    //   this.state.markers[index].openPopup()
    // }
  }
  onSelectMarkers (newMarker) {
    this.setState((previousState) => {
      console.log('setState', previousState.markers)
      return {markers: previousState.markers.concat(newMarker)}
    }) 
  }




  render () {
    const { geolocations, phonecalls, date, mango, actions, favorisPoint } = this.props
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <HomeMap geolocations={geolocations} phonecalls={phonecalls} 
              favorisPoint={favorisPoint} center={this.state.center}
              markers={this.state.markers} zoom={this.state.zoom}
              onSelectMarkers={this.onSelectMarkers} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <TimeLineView geolocations={geolocations} phonecalls={phonecalls} 
              date={date} selectDataByDate={actions.selectDataByDate} 
              mango={mango} onChangeCenter={this.onChangeCenter}/>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    geolocations: state.geolocations.geolocations,
    phonecalls: state.phonecalls.phonecalls,
    date: state.date,
    mango: state.mango,
    favorisPoint: state.favoris
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(ActionCreators, dispatch)
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage)
