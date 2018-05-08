import React, { Component } from 'react';
import Registro from './Registro';
import './Header.css';
import {Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeUser:"",
        
      };
    }

    
      componentDidMount() {
      this.setState({typeUser: 0});
      }


  render() {
    const {typeUser} = this.state.typeUser;
    console.log(this.state.typeUser);
    console.log(typeUser);
    if(this.state.typeUser ===1){
      return (
          <body>
          <Navbar >
            <Navbar.Header>
            <Navbar.Brand>
              <a href="/">     
               <span className="navItem">Home</span>
               </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          <NavItem eventKey={1} href="/Login">
            <span className="navItem">Login</span>
          </NavItem>
            <NavItem eventKey={1} href="/Registro">
            <span className="navItem">Registro</span>
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown" className="navItem">  <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2} href="/Solucion">Subir Solucion</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
              </NavDropdown>
            </Nav>
            </Navbar>
            </body>
      );
    }
    else{
      return (
        <body>
        <Navbar >
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">     
               <span className="navItem">Home</span>
               </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          <NavItem eventKey={1} href="/Login">
            <span className="navItem">Login</span>
          </NavItem>
            <NavItem eventKey={1} href="/Registro">
            <span className="navItem">Registro</span>
            </NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown" className="navItem">
            <MenuItem eventKey={3.1} href='/Enunciado'>Subir Enunciado</MenuItem>
            <MenuItem eventKey={3.2}>Listar Enunciados</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem eventKey={3.4} href="/Solucion">Subir Solucion (BORRAR DESPUES)</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.5}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          </Navbar>
          </body>
    );
    }
  }
}

export default Header;
