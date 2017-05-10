import React, { Component } from 'react'
import Timeline from './TimeLine'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'

class TimeLineView extends Component {
  render () {
    return (
      <div>
        <Row>
          <Col sm={4}>
            <h5>Date de début: <span id='start' /><Button bsStyle='success' bsSize='xsmall'><i className='fa fa-play' aria-hidden='true' /></Button>
            </h5>
          </Col>
          <Col sm={4}>
            <h5>Date de fin: <span id='end' /><Button bsStyle='success' bsSize='xsmall'><i className='fa fa-play' aria-hidden='true' /></Button>
            </h5>
          </Col>
          <Col sm={4}>
            <ButtonGroup bsSize='small' className='pull-right'>
              <Button bsStyle='success'><i className='fa fa-plus' aria-hidden='true' /></Button>
              <Button bsStyle='success'><i className='fa fa-minus' aria-hidden='true' /></Button>
              <Button bsStyle='success'><i className='fa fa-chevron-left' aria-hidden='true' /></Button>
              <Button bsStyle='success'><i className='fa fa-chevron-right' aria-hidden='true' /></Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <Timeline />
          </Col>
        </Row>
      </div>
    )
  }
}
export default TimeLineView
