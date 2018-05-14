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
        if(this.state.firebaseUser!=null){
          this.setState({typeUser: 2, userLogged: true,firebaseUser: JSON.parse(localStorage.getItem('user'))}); 
          console.log("HEADER IF TRUE")
          return;
        }  
        else{
          this.setState({typeUser: 2, userLogged: false,firebaseUser: JSON.parse(localStorage.getItem('user'))}); 
          console.log("HEADER ELSE FALSE")
          return;
        }
        console.log("HEADER estado user logged EN COMPONENT DID MOUNT: ", this.state.userLogged);
      }
 


  render() {
    console.log("HEADER OWO");
    const {typeUser} = this.state.typeUser;
    console.log(this.state.typeUser);
    console.log("HEADER UWU");
    console.log(this.state.firebaseUser);
    console.log("HEADER estado user logged: ", this.state.userLogged);
    console.log("HEADER UWU");
    if(this.state.userLogged==false){
      console.log("HEADER RENDER IF USER LOGGER FALSE");
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
                <NavItem eventKey={1} href="/Login2">
                  <span className="navItem">Login</span>
                </NavItem>
                  <NavDropdown eventKey={3} title="Alumno" id="basic-nav-dropdown" className="dropdown">  <MenuItem eventKey={3.1}>Action</MenuItem>
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
          else if(this.state.typeUser ===2){
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
                  <MenuItem className= "menuItem" eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem className= "menuItem" eventKey={3.4} href="/Solucion">Subir Solucion (BORRAR DESPUES)</MenuItem>
                  <MenuItem className= "menuItem" eventKey={3.5} href="/CrearCurso">Crear Curso</MenuItem>
                  <MenuItem className= "menuItem" eventKey={3.6} href="/Registro">Crear Usuario</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.5}>Separated link</MenuItem>
                  
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
                <NavItem eventKey={1} href="/Login2">
                  <span className="navItem">Login</span>
                </NavItem>
                  <NavItem eventKey={1} href="/Registro">
                  <span className="navItem">Agregar Alumnos</span>
                  </NavItem>
                  <NavDropdown eventKey={3} title="Profesor" id="basic-nav-dropdown" className="dropdown">
                  <MenuItem className= "menuItem" eventKey={3.1} href='/Enunciado'>Subir Enunciado</MenuItem>
                  <MenuItem className= "menuItem" eventKey={3.2} href='/ListarEnunciados'>Ver Enunciados</MenuItem>
                  <MenuItem className= "menuItem" eventKey={3.3}>Something else here</MenuItem>
                  <MenuItem className= "menuItem" eventKey={3.4} href="/Solucion">Subir Solucion (BORRAR DESPUES)</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={3.5}>Separated link</MenuItem>
                  </NavDropdown>
                </Nav>
                </Navbar>
                </body>
          );
    }

   

    
  }
  else{
    console.log("HEADER RENDER ELSE USER LOGGER TRUE");
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
          <NavItem eventKey={1} href="/Login2">
            <span className="navItem">Login</span>
          </NavItem>
            <NavDropdown eventKey={3} title="Alumno" id="basic-nav-dropdown" className="dropdown">  <MenuItem eventKey={3.1}>Action</MenuItem>
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
    else if(this.state.typeUser ===2){
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
            <MenuItem className= "menuItem" eventKey={3.3}>Something else here</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.4} href="/Solucion">Subir Solucion (BORRAR DESPUES)</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.5} href="/CrearCurso">Crear Curso</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.6} href="/Registro">Crear Usuario</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.5}>Separated link</MenuItem>
            </NavDropdown>
            <img className="image" src={this.state.firebaseUser.providerData[0].photoURL} />
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
          <NavItem eventKey={1} href="/Login2">
            <span className="navItem">Login</span>
          </NavItem>
            <NavItem eventKey={1} href="/Registro">
            <span className="navItem">Agregar Alumnos</span>
            </NavItem>
            <NavDropdown eventKey={3} title="Profesor" id="basic-nav-dropdown" className="dropdown">
            <MenuItem className= "menuItem" eventKey={3.1} href='/Enunciado'>Subir Enunciado</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.2} href='/ListarEnunciados'>Ver Enunciados</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.3}>Something else here</MenuItem>
            <MenuItem className= "menuItem" eventKey={3.4} href="/Solucion">Subir Solucion (BORRAR DESPUES)</MenuItem>
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
}
export default Header;
