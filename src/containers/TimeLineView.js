import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import * as ActionCreators from '../actions'
import TimeLine, { zoomInTimeLine, zoomOutTimeLine, moveLeftTimeLine, moveRightTimeLine } from '../components/TimeLine'

class TimeLineView extends Component {
  render () {
    const { date } = this.props
    const { actions } = this.props
    const { geolocations } = this.props
    const { mango } = this.props
    return (
      <div>
        <Row>
          <Col sm={4}>
            <h5>Date de début: <span>{date.start}</span> <Button bsStyle='success' bsSize='xsmall'><i className='fa fa-play' aria-hidden='true' /></Button>
            </h5>
          </Col>
          <Col sm={4}>
            <h5>Date de fin: <span>{date.end}</span> <Button bsStyle='success' bsSize='xsmall'><i className='fa fa-play' aria-hidden='true' /></Button>
            </h5>
          </Col>
          <Col sm={4}>
            <ButtonGroup bsSize='small' className='pull-right'>
              <Button bsStyle='success' onClick={zoomInTimeLine}><i className='fa fa-plus' aria-hidden='true' /></Button>
              <Button bsStyle='success' onClick={zoomOutTimeLine}><i className='fa fa-minus' aria-hidden='true' /></Button>
              <Button bsStyle='success' onClick={moveLeftTimeLine}><i className='fa fa-chevron-left' aria-hidden='true' /></Button>
              <Button bsStyle='success' onClick={moveRightTimeLine}><i className='fa fa-chevron-right' aria-hidden='true' /></Button>
            </ButtonGroup>
          </Col>
        </Row>
        <Row>
          <Col sm={12}>
            <TimeLine geolocations={geolocations} date={date} selectDate={actions.selectDate} mango={mango} />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    geolocations: state.geolocations.geolocations,
    date: state.date,
    mango: state.mango
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeLineView)
