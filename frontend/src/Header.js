import React, { Component } from 'react';
import Registro from './Registro';
import './css/Header.css';
import {Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap";


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
            <span className="navItem"><span className="glyphicon glyphicon-home"></span></span>
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
        <NavItem eventKey={1} href="/Login2">
          <span className="navItem">Log In</span>
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
               <span className="navItem"><span className="glyphicon glyphicon-home"></span></span>
               </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          <NavItem eventKey={1} href="/Login2">
            <span className="navItem">Sesión</span>
          </NavItem>
            <NavDropdown eventKey={3} title="Alumno" id="basic-nav-dropdown" className="Profesor"> 
              <LinkContainer to="/ListarEnunciados">
            <NavItem className="menuItem" eventKey={3.2} href="#">
                Ver Mis Enunciados
            </NavItem>
             </LinkContainer>
             <LinkContainer to="/ListarSoluciones">
            <NavItem className="menuItem" eventKey={3.3} href="#">
                Ver Mis Soluciones
            </NavItem>
             </LinkContainer> 
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
               <span className="navItem"><span className="glyphicon glyphicon-home"></span></span>
               </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          <NavItem eventKey={1} href="/Login2">
            <span className="navItem">Sesión</span>
          </NavItem>
            <NavDropdown eventKey={3} title="Agregar Usuarios" id="basic-nav-dropdown" className="Profesor">
            <LinkContainer to="/Registro">
            <NavItem className="menuItem" eventKey={3.5} href="#">
                Registrar Alumnos
            </NavItem>
             </LinkContainer>
            <LinkContainer to="/RegistroProfesor">
            <NavItem className="menuItem" eventKey={3.6} href="#">
                Registrar Profesor
            </NavItem>
             </LinkContainer>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Coordinador" id="basic-nav-dropdown" className="Profesor">
            <LinkContainer to="/Enunciado">
            <NavItem className="menuItem" eventKey={3.1} href="#">
                Subir Enunciado
            </NavItem>
             </LinkContainer>
             <LinkContainer to="/ListarEnunciados">
            <NavItem className="menuItem" eventKey={3.2} href="#">
                Listar Enunciados
            </NavItem>
             </LinkContainer>
             <LinkContainer to="/CrearCurso">
            <NavItem className="menuItem" eventKey={3.3} href="#">
                Administrar Secciones
            </NavItem>
             </LinkContainer>
            <LinkContainer to="/ListarSoluciones">
            <NavItem className="menuItem" eventKey={3.4} href="#">
                Ver Soluciones
            </NavItem>
             </LinkContainer>
             <LinkContainer to="/Progreso">
            <NavItem className="menuItem" eventKey={3.8} href="#">
                Ver progreso
            </NavItem>
             </LinkContainer>
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
               <span className="navItem"><span className="glyphicon glyphicon-home"></span></span>
               </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          <NavItem eventKey={1} href="/Login2">
            <span className="navItem">Sesión</span>
          </NavItem>
            <LinkContainer to="/Registro">
            <NavItem className="menuItem" eventKey={3.6} href="#">
                Registrar Alumnos
            </NavItem>
             </LinkContainer>
  
            <NavDropdown eventKey={3} title="Profesor" id="basic-nav-dropdown" className="dropdown">
            <LinkContainer to="/Enunciado">
            <NavItem className="menuItem" eventKey={3.7} href="#">
                Subir Enunciado
            </NavItem>
             </LinkContainer>
             <LinkContainer to="/ListarEnunciados">
            <NavItem className="menuItem" eventKey={3.5} href="#">
                Ver Enunciados
            </NavItem>
             </LinkContainer>
             <LinkContainer to="/ListarSoluciones">
            <NavItem className="menuItem" eventKey={3.5} href="#">
                Ver Soluciones
            </NavItem>
             </LinkContainer>
             <LinkContainer to="/Progreso">
            <NavItem className="menuItem" eventKey={3.8} href="#">
                Ver progreso
            </NavItem>
             </LinkContainer>
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
