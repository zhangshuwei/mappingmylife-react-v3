import React, { Component } from 'react'
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap'
import TimeLine, { zoomInTimeLine, zoomOutTimeLine, moveLeftTimeLine, moveRightTimeLine } from '../components/TimeLine'

class TimeLineView extends Component {
  render () {
    const { date, selectDataByDate, geolocations, mango, phonecalls } = this.props
    return (
      <div>
        <div>
          <h5>Date de début: <span>{date.start}</span></h5>
          <h5>Date de fin: <span>{date.end}</span></h5>
        </div>
        <Row>
          <Col sm={12}>
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
            <TimeLine geolocations={geolocations} phonecalls={phonecalls} date={date} selectDataByDate={selectDataByDate} mango={mango} />
          </Col>
        </Row>
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//   return {
//     geolocations: state.geolocations.geolocations,
//     phonecalls: state.phonecalls.phonecalls,
//     date: state.date,
//     mango: state.mango
//   }
// }
// const mapDispatchToProps = (dispatch) => ({
//   actions: bindActionCreators(ActionCreators, dispatch)
// })
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(TimeLineView)
export default TimeLineView
