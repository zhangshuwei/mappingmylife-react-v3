import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'
import FavorisMap from '../components/FavorisMap'
import { Grid, Row, Col } from 'react-bootstrap'
import '../styles/rowContent.css'

class FavorisPage extends Component {
  constructor (props) {
    super(props)
    this.props.actions.fetchTopGeolocations(this.props.mango.geolocationsIndexByDate)
    this.props.actions.fetchTopPhonecalls(this.props.mango.phonecallsIndexByDate)
  }
  render () {
    const { topGeolocations, topPhonecalls } = this.props
    return (
      <Grid fluid>
        <Row>
          <Col sm={12}>
            <div className='rowContent'>
              <FavorisMap geolocations={topGeolocations} phonecalls={topPhonecalls}/>
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
    mango: state.mango
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
