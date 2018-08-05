import React, { Component } from 'react';
import Registro from './Registro';
import './css/Header.css';
import {Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeUser:"",
      firebaseUser: JSON.parse(localStorage.getItem('user')),
      userLogged:JSON.parse(localStorage.getItem('userLogged')),
      };
    }

    
      componentDidMount() { 
        
      }
 


  render() {
    const typeUser = this.props.typeUser;
    const userLogged = this.props.loggedState;
    const photoURL = this.props.userAvatar;
    if(userLogged===false){
      return (
        <body>
        <Navbar >
          <Navbar.Header>
          <Navbar.Brand>
            <a href="/">     
            <span className="navItem">Inicio</span>
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
        <NavItem eventKey={1} href="/Login2">
          <span className="navItem">Login</span>
        </NavItem>
          </Nav>
          </Navbar>
          </body>
    );      
   
    
    }
  else{
    if(typeUser ===1){
      return (
          <body>
          <Navbar >
            <Navbar.Header>
            <Navbar.Brand>
              <a href="/">     
               <span className="navItem">Inicio</span>
               </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          <NavItem eventKey={1} href="/Login2">
            <span className="navItem">Login</span>
          </NavItem>
            <NavDropdown eventKey={3} title="Alumno" id="basic-nav-dropdown" className="Profesor">  
              <MenuItem className="menuItem" eventKey={3.2} href="/ListarEnunciados">Ver Mis Enunciados</MenuItem>
              <MenuItem className="menuItem" eventKey={3.3} href="/ListarSoluciones">Ver Mis Soluciones</MenuItem>
              </NavDropdown>
              <div className="image-cropper">
              <img className="image" src={photoURL} />
              </div>
            </Nav>
            </Navbar>
            </body>
      );
    }
    else if(typeUser ===2){
      return (
        <body>
        <Navbar >
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/">     
               <span className="navItem">Inicio</span>
               </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          <NavItem eventKey={1} href="/Login2">
            <span className="navItem">Login</span>
          </NavItem>
            <NavDropdown eventKey={3} title="Agregar Usuarios" id="basic-nav-dropdown" className="Profesor">
            <MenuItem className= "menuItem" eventKey={3.7} href='/Registro'>Registrar Alumno</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.8} href='/RegistroProfesor'>Registrar Profesor</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Coordinador" id="basic-nav-dropdown" className="Profesor">
            <MenuItem className= "menuItem" eventKey={3.1} href='/Enunciado'>Subir Enunciado</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.2} href='/ListarEnunciados'>Listar Enunciados</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.3} href="/CrearCurso">Administrar Seccion</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.4} href="/Registro">Crear Usuario</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.5} href="/ListarSoluciones">Ver Soluciones</MenuItem>
            </NavDropdown>
            <div className="image-cropper">
            <img className="image" src={photoURL} />
            </div>
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
               <span className="navItem">Inicio</span>
               </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          <NavItem eventKey={1} href="/Login2">
            <span className="navItem">Login</span>
          </NavItem>
            <NavItem eventKey={1} href="/Registro">
            <span className="navItem">Agregar Alumnos</span>
            </NavItem>
            <NavDropdown eventKey={3} title="Profesor" id="basic-nav-dropdown" className="dropdown">
            <MenuItem className= "menuItem1" eventKey={3.1} href='/Enunciado'>Subir Enunciado</MenuItem>
            <MenuItem className= "menuItem2" eventKey={3.2} href='/ListarEnunciados'>Ver Enunciados</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.5} href="/ListarSoluciones">Ver Soluciones</MenuItem>

            </NavDropdown>
            <div className="image-cropper"> 
            <img className="image" src={photoURL} />
            </div>
          </Nav>
          </Navbar>
          </body>
    );
    }
  }
}
}
export default Header;
