import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { FAVORISPOINT_DOCTYPE } from '../constants/config'
import '../styles/rowContent.css'

class FavorisForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      favorisType: '',
      showCustomerInput: false,
      customerType: '',
      errorMessage:'',
      successMessage: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCustomerType = this.handleCustomerType.bind(this)
    this.addFavoris = this.addFavoris.bind(this)
    this.modifyFavoris = this.modifyFavoris.bind(this)
  }

  handleChange (e) {
    if(e.target.value === 'others') {
      this.setState({ showCustomerInput: true })
    } else {
      this.setState({ showCustomerInput: false })
    }
    this.setState({ favorisType: e.target.value })
  }

  handleCustomerType (e) {
    this.setState({ customerType: e.target.value})
  }

  checkIfFieldValid (lat, lng, type, customerType) {
    return  (lat === '' || lng === ''|| type === '' || (type === 'others' && customerType === '')) ? false : true
  }

  addFavoris () {
    let isFieldValid = this.checkIfFieldValid(this.props.point.latitude, this.props.point.longitude, this.state.favorisType, this.state.customerType)
    let key = this.props.point.latitude.toString() + this.props.point.longitude.toString()
    if (!isFieldValid) {
      this.setState({ errorMessage: 'invalid champs' })
      this.setState({ successMessage: '' })
    } else if (this.props.favorisPoint.favorisTypeMap[key] !== undefined || this.props.favorisPoint.favorisTypeMap[key]) {
      this.setState({errorMessage: 'Ce point est déjà un point favoris' })
      this.setState({ successMessage: '' })
    } else {
      this.setState({ errorMessage: '' })
      let favorisPoint = {}
      favorisPoint.latitude = this.props.point.latitude
      favorisPoint.longitude = this.props.point.longitude
      favorisPoint.category = (this.state.favorisType === 'others' ? this.state.customerType : this.state.favorisType)
      cozy.client.data.create(FAVORISPOINT_DOCTYPE, favorisPoint)
      .then( function (result) {
        let pointKey = result.latitude.toString() + result.longitude.toString()
        this.props.actions.addFavorisTypeMap(pointKey, result.category)
        this.props.actions.addFavorisIdMap(pointKey, result._id)
        this.setState({ successMessage: 'OK' })
      }.bind(this))
    }
  }

  modifyFavoris () {
    let isFieldValid = this.checkIfFieldValid(this.props.point.latitude, this.props.point.longitude, this.state.favorisType, this.state.customerType)
    let key = this.props.point.latitude.toString() + this.props.point.longitude.toString()
    if (!isFieldValid) {
      this.setState({ errorMessage: 'invalid champs' })
      this.setState({ successMessage: '' })
    } else if (this.props.favorisPoint.favorisIdMap[key] === undefined || !this.props.favorisPoint.favorisIdMap[key]) {
      this.setState({ errorMessage: 'Veuillez d\'abord ajouter ce point, puis le modifier' })
      this.setState({ successMessage: '' })
    } else {
      let modifyId = this.props.favorisPoint.favorisIdMap[key]
      let modifyField = {category: this.state.favorisType === 'others' ? this.state.customerType : this.state.favorisType}
      cozy.client.data.updateAttributes(FAVORISPOINT_DOCTYPE, modifyId, modifyField)
      .then( function (result) {
        console.log(result)
        let pointKey = result.latitude.toString() + result.longitude.toString()
        this.props.actions.updateFavorisTypeMap(pointKey, result.category)
        this.props.actions.updateFavorisIdMap(pointKey, modifyId)
        this.setState({ successMessage: 'OK' })
      }.bind(this))
    }
  }
  render () {
    const { point } = this.props
    return (
      <div>
        <div className='rowContent'>
          <p style={{ display: (this.state.errorMessage.length === 0) ? 'none' : 'block', color: 'red' }}>{this.state.errorMessage}</p>
        </div>
        <div className='rowContent'>
          <p style={{ display: (this.state.successMessage.length === 0) ? 'none' : 'block', color: 'green' }}>{this.state.successMessage}</p>
        </div>
        <div className='rowContent'>
        <Form inline>
          <FormGroup controlId="formInlineLat">
            <ControlLabel>Latitude:</ControlLabel>{' '}
            <FormControl type="text" placeholder="Latitude" value={point.latitude} readOnly/>
          </FormGroup>

          <FormGroup controlId="formInlineLng">
            <ControlLabel>Longtitude:</ControlLabel>{' '}
            <FormControl type="text" placeholder="Longtitude" value={point.longitude} readOnly/>
          </FormGroup>

          <FormGroup controlId="formControlsType">
            <ControlLabel>Choisir le type:</ControlLabel>{' '}
            <FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
              <option value=""> </option>
              <option value="maison">Maison</option>
              <option value="travail">Travail</option>
              <option value="sport">Sport</option>
              <option value="marche">Marché</option>
              <option value="others">Autres</option>
            </FormControl>
          </FormGroup>

          <FormGroup controlId="formInlineType">
            <FormControl style={{ display: this.state.showCustomerInput ? 'block' : 'none' }}  placeholder="Customer favoris type" type="text" value={this.state.customerType} onChange={this.handleCustomerType} />
          </FormGroup>
        </Form>
      </div>
        <div className='rowContent'>
        <Button type="button" bsSize='small' bsStyle='success' onClick={this.addFavoris}><i className='fa fa-plus' aria-hidden='true' /> Ajouter</Button>
        <Button type="button" bsSize='small' bsStyle='primary' onClick={this.modifyFavoris}><i className='fa fa-pencil' aria-hidden='true' /> Modifier</Button>
        <Button type="button" bsSize='small' bsStyle='danger'><i className='fa fa-trash' aria-hidden='true' /> Supprimer</Button>
        </div>
      </div>
    )

  }
}
export default FavorisForm
