import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'
import { Grid, Row, Col } from 'react-bootstrap'
import TraceMap from '../components/TraceMap'
import Calendar from '../components/Calendar'
import '../styles/rowContent.css'

class ItineraryPage extends Component {
  render () {
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <TraceMap />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <Calendar />
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}
export default ItineraryPage
