import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'
import { Grid, Row, Col, Button } from 'react-bootstrap'
import TraceMap, {showAgain} from '../components/TraceMap'
import Calendar from '../components/Calendar'
import '../styles/rowContent.css'

class ItineraryPage extends Component {
  render () {
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <TraceMap data={this.props.data.path}/>
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <Calendar indexByDate={this.props.indexByDate} selectDate={this.props.actions.getItinerary}/>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    data: state.itinerary.path,
    indexByDate: state.mango.geolocationsIndexByDate
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
)(ItineraryPage)
