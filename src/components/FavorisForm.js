import React, { Component } from 'react'
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'

class FavorisForm extends Component {
  constructor (props) {
    super (props)
    this.state = {
      latitude: '',
      longtitude: '',
      favorisType: ''
    }
  }
  render () {
    return (
      <Form inline>
        <FormGroup controlId="formInlineLat">
          <ControlLabel>Latitude:</ControlLabel>{' '}
          <FormControl type="text" placeholder="Latitude" value={this.state.latitude} readOnly/>
        </FormGroup>

        <FormGroup controlId="formInlineLng">
          <ControlLabel>Longtitude: </ControlLabel>{' '}
          <FormControl type="text" placeholder="Longtitude" value={this.state.longtitude} readOnly/>
        </FormGroup>

        <FormGroup controlId="formControlsType">
          <ControlLabel>Choisir le type</ControlLabel>{' '}
          <FormControl componentClass="select" placeholder="select">
            <option value=""> </option>
            <option value="maison">Maison</option>
            <option value="travail">Travail</option>
            <option value="sport">Sport</option>
            <option value="marche">Marché</option>
            <option value="others">Autres</option>
          </FormControl>
        </FormGroup>

        <Button type="button" bsSize='small' bsStyle='success'><i className='fa fa-plus' aria-hidden='true' /> Ajouter</Button>
        <Button type="button" bsSize='small' bsStyle='primary'><i className='fa fa-pencil' aria-hidden='true' /> Modifier</Button>
        <Button type="button" bsSize='small' bsStyle='danger'><i className='fa fa-trash' aria-hidden='true' /> Supprimer</Button>
      </Form>
    )

  }
}
export default FavorisForm
