import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'
import HomeMap from '../components/HomeMap'
import TimeLineView from '../components/TimeLineView'
import { Grid, Row, Col } from 'react-bootstrap'
import '../../node_modules/moment/min/moment-with-locales'
import '../styles/rowContent.css'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.props.actions.indexGeolocationsByDate().then((geoIndexByDate) => this.props.actions.fetchGeoLatest(geoIndexByDate))
    this.props.actions.indexPhonecallsByDate().then((phoneIndexByDate) => this.props.actions.fetchPhonecallsLatest(phoneIndexByDate))
    this.props.actions.indexFavorisPoint()
  }
  // componentDidMount() {
  //   console.log(this.props.date)
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if((_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state))) {
  //     console.log('************************** is equal')
  //   }
  //    return !(_.isEqual(nextProps, this.props) && _.isEqual(nextState, this.state))
  // }
  render () {
    const { geolocations, phonecalls, date, mango, actions, favorisPoint } = this.props
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <HomeMap geolocations={geolocations} phonecalls={phonecalls} favorisPoint={favorisPoint}/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <TimeLineView geolocations={geolocations} phonecalls={phonecalls} date={date} selectDataByDate={actions.selectDataByDate} mango={mango} />
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
