import React, {Component} from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import _ from 'lodash'
import { Grid, Row, Col, Button, InputGroup, FormControl, FormGroup, Form, ControlLabel } from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import '../styles/calendar.css'
import '../styles/rowContent.css'
moment.locale('fr')

const InputCustomer = (props) => {
  return (
    <FormControl
      onClick={props.onClick} value={props.value} onChange={props.onChange}
      placeholder='Choisir la date'/>
  )
}

class Calendar extends Component {
  constructor (props) {
    super (props)
    this.state = {
      startDate: moment("2016-11-15")
    }
    this.handleChange = this.handleChange.bind(this)
    this.selectDate = this.selectDate.bind(this)
  }

  handleChange (date) {
    this.setState({
      startDate: date
    })
  }
  selectDate () {
    if(!(_.isEmpty(this.state.startDate))) {
      let startDate = moment(this.state.startDate._d).format("YYYY-MM-DD")
      this.props.fetchPath(this.props.indexByDate, startDate)
    }
  }

  render () {
    return (
      <div>
        <div className='rowContent'>
          <form>
            <FormGroup>
              <ControlLabel>Choisir la date:</ControlLabel>{' '}
              <DatePicker customInput={<InputCustomer />}
              selected={this.state.startDate} onChange={this.handleChange}
              fixedHeight={true} locale='fr'
              placeholderText='Click to select a date'
              peekNextMonth showMonthDropdown
              showYearDropdown dropdownMode="select" />
            </FormGroup>
            <FormGroup>
              <Button type='button' bsSize='small' bsStyle='success' onClick={this.selectDate}>Display</Button>
            </FormGroup>
          </form>
        </div>
    </div>
  )
  }
}
export default Calendar
