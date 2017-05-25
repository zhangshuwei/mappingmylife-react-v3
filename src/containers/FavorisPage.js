import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'
import FavorisMap from '../components/FavorisMap'
import FavorisForm from '../components/FavorisForm'
import { Grid, Row, Col } from 'react-bootstrap'
import { homeIcon }from '../components/Icons'
import '../styles/rowContent.css'

class FavorisPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      point: {
        latitude: '',
        longitude: ''
      }
    }
    this.changeLatLng = this.changeLatLng.bind(this)
    this.props.actions.indexFavorisPoint().then((favorisIndex) => this.props.actions.fetchFavorisPoint(favorisIndex))
    this.props.actions.indexGeolocationsByDate().then((geoIndexByDate) => this.props.actions.fetchTopGeolocations(geoIndexByDate))
    this.props.actions.indexPhonecallsByDate().then((phoneIndexByDate) => this.props.actions.fetchTopPhonecalls(phoneIndexByDate))
    // this.props.actions.fetchTopGeolocations(this.props.mango.geolocationsIndexByDate)
    // this.props.actions.fetchTopPhonecalls(this.props.mango.phonecallsIndexByDate)
  }
  changeLatLng (e) {
    this.setState({
      point: {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      }
    })
  }
  render () {
    const { topGeolocations, topPhonecalls, favorisPoint, actions } = this.props
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <FavorisMap geolocations={topGeolocations} phonecalls={topPhonecalls} changeLatLng={this.changeLatLng} favorisPoint={favorisPoint}/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <FavorisForm  favorisPoint={favorisPoint} point={this.state.point} actions={actions}/>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    topGeolocations: state.mostpoints.topGeolocations,
    topPhonecalls: state.mostpoints.topPhonecalls,
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
)(FavorisPage)
