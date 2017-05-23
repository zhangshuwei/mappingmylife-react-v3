import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

class FavorisForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      favorisType: '',
      showCustomerInput: false,
      customerType: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleCustomerType = this.handleCustomerType.bind(this)
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
    console.log(this.state.customerType)
  }

  render () {
    const { point } = this.props
    return (
      <Form inline>
        <FormGroup controlId="formInlineLat">
          <ControlLabel>Latitude:</ControlLabel>{' '}
          <FormControl type="text" placeholder="Latitude" value={point.latitude} readOnly/>
        </FormGroup>

        <FormGroup controlId="formInlineLng">
          <ControlLabel>Longtitude: </ControlLabel>{' '}
          <FormControl type="text" placeholder="Longtitude" value={point.longitude} readOnly/>
        </FormGroup>

        <FormGroup controlId="formControlsType">
          <ControlLabel>Choisir le type</ControlLabel>{' '}
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

        <Button type="button" bsSize='small' bsStyle='success' onClick={this.addFavoris}><i className='fa fa-plus' aria-hidden='true' /> Ajouter</Button>
        <Button type="button" bsSize='small' bsStyle='primary'><i className='fa fa-pencil' aria-hidden='true' /> Modifier</Button>
        <Button type="button" bsSize='small' bsStyle='danger'><i className='fa fa-trash' aria-hidden='true' /> Supprimer</Button>
      </Form>
    )

  }
}
export default FavorisForm
