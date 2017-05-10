import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGeolocations } from '../actions/geolocations'
import { indexGeolocationsByDate } from '../actions/mango'
import MyMap from '../components/MyMap'
import TimeLineView from '../components/TimeLineView'
import { Grid, Row, Col } from 'react-bootstrap'
import '../../node_modules/moment/min/moment-with-locales'
import '../styles/rowContent.css'
class MapView extends Component {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(indexGeolocationsByDate())
    .then(mangoIndexByDate => dispatch(fetchGeolocations(mangoIndexByDate)))
  }
  // componentWillReceiveProps(nextProps) {
  //   const { dispatch } = nextProps
  //   dispatch(fetchGeolocations())
  // }

  render () {
    const {geolocations} = this.props

    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <MyMap geolocations={geolocations} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <TimeLineView />
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  geolocations: state.geolocations.geolocations
})

export default connect(
  mapStateToProps
)(MapView)
