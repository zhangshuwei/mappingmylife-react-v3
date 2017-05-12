import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Timeline from '../components/TimeLine'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import * as ActionCreators from '../actions'

class TimeLineView extends Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange () {
    console.log('changed')
  }
  render () {
    const { date } = this.props
    const { actions } = this.props
    const { geolocations } = this.props
    return (
      <div>
        <Row>
          <Col sm={4}>
            <h5>Date de début:<span>{date.start}</span> <Button bsStyle='success' bsSize='xsmall'><i className='fa fa-play' aria-hidden='true' /></Button>
            </h5>
          </Col>
          <Col sm={4}>
            <h5>Date de fin: <span>{date.end}</span><Button bsStyle='success' bsSize='xsmall'><i className='fa fa-play' aria-hidden='true' /></Button>
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
            <Timeline geolocations={geolocations} selectDate={actions.selectDate} />
          </Col>
        </Row>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    date: state.date
  }
}
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(ActionCreators, dispatch)
})
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TimeLineView)
