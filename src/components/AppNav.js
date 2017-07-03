import React from 'react'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'
import Logo from '../styles/Logo.png'
import { LinkContainer } from 'react-router-bootstrap'
import '../styles/navbar.css'

export const AppNav = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href='#'><img src={Logo}/> Mapping My Life</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        <LinkContainer exact to='/'>
          <NavItem eventKey={1} href='/'>Home</NavItem>
        </LinkContainer>
        <LinkContainer to='/map'>
          <NavItem eventKey={2} href='/map'>Aggregate</NavItem>
        </LinkContainer>
        <LinkContainer to='/trace'>
          <NavItem eventKey={3} href='/trace'>Itinerary</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
export default AppNav
