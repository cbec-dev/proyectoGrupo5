import React, { Component } from 'react';
import logo from './logo.svg';
import qs from 'qs';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock, Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"
var ReactDOM = require('react-dom');
const createReactClass = require('create-react-class');


class Solucion extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            career: "",
            seccion: "",
            opcion: ""

        };
    }


        render() {
        
            var options = {
                lineNumbers: true,
                readOnly: this.state.readOnly,
                mode: this.state.mode
            };
            const header = this.props.statement.header;
            const typeUser = this.props.typeUser;
            if(header === undefined || this.props.statement ===undefined){
                return(<div> {this.props.history.push("/ListarEnunciado")} </div>); 
            }
            if(typeUser===1 || typeUser===2){
                return (
                   <body className="body"> 
                    <form className="form">
                   
                    <label className="labels"> Escoger de quién desea ver el progreso  </label>
                    
                        <select onChange={this.changeMode} value={this.state.name}>
                            <option value="seccion">Seccion</option>
                            <option value="carrera">Carrera</option>
                        </select>

                    <label className="labels"> Escoger las estadísticas que desea ver  </label>
                    
                    <select onChange={this.changeMode} value={this.state.name}>
                        <option value="Tiempo empleado en resolver problemas">Tiempo empleado en resolver problemas</option>
                        <option value="soluciones correctas">SOluciones correctas</option>
                    </select>

         
                    <div className="div1">
                      <Button bsStyle="primary" type="button" onClick={(e) => this.buscar(this.state)} disabled={this.state.bool}>Buscar progreso</Button>

                    </div>
                  </form>

                <div className="div1">
                    <label classname="labels"> Salida del progreso: </label>
                </div>  
                <div class="divTxt">
                <pre class="gb wf" id="preOutput">
                {this.state.salida}
  
                </pre>
            </div>
            
            </body>
                    
                );
            }
            else{
                 alert("No tiene permisos para acceder a esta vista")
                return(
                    <div> {this.props.history.push("/")} </div>
                );
            }
            }

          }
    
    
    export default Solucion;