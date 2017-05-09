import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGeolocations } from '../actions/geolocations'
import { indexGeolocationsByDate } from '../actions/mango'
import MyMap from '../components/MyMap'
import MyTimeLine from '../components/MyTimeLine'
import Button from 'react-bootstrap/lib/Button'

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
      <div>
        <MyMap geolocations={geolocations} />
        <MyTimeLine />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  geolocations: state.geolocations.geolocations
})

export default connect(
  mapStateToProps
)(MapView)
