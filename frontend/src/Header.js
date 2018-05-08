import React, { Component } from 'react';
import Registro from './Registro';
import {Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"

class Header extends Component {



  render() {
    
    return (
        <body>
        <Navbar fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">Plataforma</a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <NavItem eventKey={1} href="/upload">
              Test
            </NavItem>
            <NavItem eventKey={1} href="/code">
              Code Editor
            </NavItem>
          </Nav>
          </Navbar>
          </body>
    );
  }
}

export default Header;
