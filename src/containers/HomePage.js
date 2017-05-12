import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGeolocations } from '../actions/geolocations'
import { fetchGeoLastDay } from '../actions/date'
import { indexGeolocationsByDate } from '../actions/mango'
import MyMap from '../components/MyMap'
import TimeLineView from '../containers/TimeLineView'
import { Grid, Row, Col } from 'react-bootstrap'
import '../../node_modules/moment/min/moment-with-locales'
import '../styles/rowContent.css'
class HomePage extends Component {
  componentWillMount () {
    const { dispatch } = this.props
    let mangoIndex = dispatch(indexGeolocationsByDate())
    // .then(mangoIndexByDate => dispatch(fetchGeolocations(mangoIndexByDate)))
    mangoIndex.then((mangoIndexByDate) => dispatch(fetchGeoLastDay(mangoIndexByDate)))
    mangoIndex.then((mangoIndexByDate) => dispatch(fetchGeolocations(mangoIndexByDate)))
  }

  render () {
    const { geolocations } = this.props
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
              <TimeLineView geolocations={geolocations}/>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    geolocations: state.geolocations.geolocations
  }
}

export default connect(
  mapStateToProps
)(HomePage)
