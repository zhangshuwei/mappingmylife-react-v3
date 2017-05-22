import React from 'react'
import Navbar from 'react-bootstrap/lib/Navbar'
import Nav from 'react-bootstrap/lib/Nav'
import NavItem from 'react-bootstrap/lib/NavItem'

import { LinkContainer } from 'react-router-bootstrap'
export const AppNav = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href='#'>Mapping My Life</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <LinkContainer exact to='/'>
        <NavItem eventKey={1} href='/'>Home</NavItem>
      </LinkContainer>
      <LinkContainer to='/map'>
        <NavItem eventKey={2} href='/map'>Aggregate</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
)
export default AppNav
