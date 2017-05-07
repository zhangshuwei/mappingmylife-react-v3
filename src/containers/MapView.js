import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchGeolocations } from '../actions/geolocations'
import { indexGeolocationsByDate } from '../actions/mango'
import MyMap from '../components/MyMap'

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
    console.log(cozy.client)
    return (
      <div>
        <h1>HomePage</h1>
         <MyMap />
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
