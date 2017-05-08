import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGeolocations } from '../actions/geolocations'
import { indexGeolocationsByDate } from '../actions/mango'
import MyMap from '../components/MyMap'
import Button from 'react-bootstrap/lib/Button'

class MapView extends Component {
  // componentDidMount () {
  //   const { dispatch } = this.props
  //   dispatch(fetchGeolocations())
  // }
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
        <h1>HomePage</h1>
        <Button bsStyle='info'>Button<i className='fa fa-address-book' /></Button>
        <MyMap geolocations={geolocations} />
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
