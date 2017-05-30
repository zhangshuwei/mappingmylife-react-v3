import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'
import FavorisMap from '../components/FavorisMap'
import FavorisForm from '../components/FavorisForm'
import { Grid, Row, Col } from 'react-bootstrap'
import '../styles/rowContent.css'

class FavorisPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      point: {
        latitude: '',
        longitude: ''
      },
      errorMessage: '',
      successMessage: ''
    }

    this.props.actions.indexFavorisPoint().then((favorisIndex) => this.props.actions.fetchFavorisPoint(favorisIndex))
    this.props.actions.fetchTopGeolocations()
    this.props.actions.fetchTopPhonecalls()
  }
  changeLatLng (e) {
    this.setState({
      point: {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng
      },
      errorMessage: '',
      successMessage: ''
    })
  }
  showMessage (errorMessage, successMessage) {
    this.setState({
      errorMessage: errorMessage,
      successMessage: successMessage
    })
  }
  render () {
    const { topGeolocations, topPhonecalls, favorisPoint, actions } = this.props
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <FavorisMap geolocations={topGeolocations} phonecalls={topPhonecalls} changeLatLng={this.changeLatLng.bind(this)} favorisPoint={favorisPoint} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <p style={{ display: (this.state.errorMessage.length === 0) ? 'none' : 'block', color: 'red' }}>{this.state.errorMessage}</p>
            </div>
            <div className='rowContent'>
              <p style={{ display: (this.state.successMessage.length === 0) ? 'none' : 'block', color: 'green' }}>{this.state.successMessage}</p>
            </div>
            <div className='rowContent'>
              <FavorisForm favorisPoint={favorisPoint} point={this.state.point} showMessage={this.showMessage.bind(this)}actions={actions} />
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
