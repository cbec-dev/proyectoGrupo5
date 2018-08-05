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
    console.log("HEADER OWO");
    const typeUser = this.props.typeUser;
    const userLogged = this.props.loggedState;
    const photoURL = this.props.userAvatar;
    console.log(this.state.typeUser);
    console.log("HEADER UWU");
    console.log(this.state.firebaseUser);
    console.log("HEADER estado user logged: ", this.state.userLogged);
    console.log("HEADER UWU");
    if(userLogged===false){
      console.log("HEADER RENDER IF USER LOGGER FALSE");
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
        <NavItem eventKey={1} href="/frontendGrupo5/Login2">
          <span className="navItem">Login</span>
        </NavItem>
          </Nav>
          </Navbar>
          </body>
    );      
   

    
    }
  else{
    console.log("HEADER RENDER ELSE USER LOGGER TRUE");
    if(typeUser ===1){
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
          <NavItem eventKey={1} href="/frontendGrupo5/Login2">
            <span className="navItem">Login</span>
          </NavItem>
            <NavDropdown eventKey={3} title="Alumno" id="basic-nav-dropdown" className="dropdown">  <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2} href="/frontendGrupo5/ListarEnunciados">Ver Mis Enunciados</MenuItem>
              <MenuItem eventKey={3.3} href="/frontendGrupo5/ListarSoluciones">Ver Mis Soluciones</MenuItem>
              <MenuItem eventKey={3.4}>Separated link</MenuItem>
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
               <span className="navItem">Home</span>
               </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          <NavItem eventKey={1} href="/frontendGrupo5/Login2">
            <span className="navItem">Login</span>
          </NavItem>
            <NavDropdown eventKey={3} title="Agregar Usuarios" id="basic-nav-dropdown" className="Profesor">
            <MenuItem className= "menuItem" eventKey={3.7} href='/frontendGrupo5/Registro'>Registrar Alumno</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.8} href='/frontendGrupo5/RegistroProfesor'>Registrar Profesor</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={3} title="Coordinador" id="basic-nav-dropdown" className="Profesor">
            <MenuItem className= "menuItem" eventKey={3.1} href='/frontendGrupo5/Enunciado'>Subir Enunciado</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.2} href='/frontendGrupo5/ListarEnunciados'>Listar Enunciados</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.3}>Something else here</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.5} href="/frontendGrupo5/CrearCurso">Administrar Seccion</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.6} href="/frontendGrupo5/Registro">Crear Usuario</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.7} href="/frontendGrupo5/ListarSoluciones">Ver Soluciones</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.5}>Separated link</MenuItem>
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
               <span className="navItem">Home</span>
               </a>
            </Navbar.Brand>
          </Navbar.Header>
          <Nav>
          <NavItem eventKey={1} href="/frontendGrupo5/Login2">
            <span className="navItem">Login</span>
          </NavItem>
            <NavItem eventKey={1} href="/frontendGrupo5/Registro">
            <span className="navItem">Agregar Alumnos</span>
            </NavItem>
            <NavDropdown eventKey={3} title="Profesor" id="basic-nav-dropdown" className="dropdown">
            <MenuItem className= "menuItem1" eventKey={3.1} href='/frontendGrupo5/Enunciado'>Subir Enunciado</MenuItem>
            <MenuItem className= "menuItem2" eventKey={3.2} href='/frontendGrupo5/ListarEnunciados'>Ver Enunciados</MenuItem>
            <MenuItem className= "menuItem3" eventKey={3.3} href='/'>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.5}>Separated link</MenuItem>
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
