import React, { Component } from 'react';
import logo from './logo.svg';
import './Enunciado.css';
import Registro from './Registro';
import Login from './Login';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"


class Enunciado extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.state = {
            isLoading: false,
            nameStatement:"",
            text:"",

        };
    }
    subirFormulario(e) {
        console.log("formulario enviado c:");
        this.statement = {nameStatement: "", text: ""}
        this.statement.nameStatement = e.nameStatement;
        this.statement.text = e.text; 
        if(this.statement.nameStatement==="" || this.statement.text ===""){
            console.log("Debe llenar todos las casillas");
            return;
        }
        else{
            this.limpiarValores(1);
            console.log("Usuario: "+ this.statement);
            console.log("Datos: "+ this.statement.nameStatement);
            console.log("Datos: "+ this.statement.text);
            
            fetch('http://104.236.68.75:8080/backendGrupo5/api/add?codigo='+this.user.codigo+'&nombre='+this.user.nombre+'&fecha='+this.user.fecha+'&categoria='+this.user.categoria+'&precio='+this.user.precio)
            .then(response => console.log("Producto Agregado"+response)) 
            }
       
        return;
        }
    limpiarValores(i){
        if(i===1){
            this.setState({isLoading: false, nameStatement:"", text:""});
            this.render();
        }
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name; 
        this.setState({
            [name]: value
            });
        console.log(name, value, target);
        }


        render() {
                return (
                    <form>
                    <div>
                        <label> Nombre Enunciado:  </label>
                        <input name= "nameStatement" type = "text" value={this.state.nameStatement}
                        onChange = {this.handleInputChange} />
                    </div>
                    
                    <div>
                        <label> Texto:  </label>
                        <textarea name= "text" type = "text" value={this.state.text} 
                        onChange = {this.handleInputChange} />
                    </div>
                    <div>
                      <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Subir Enunciado</button>
                      <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>
                    </div>
                  </form>
    
                    
                );
            }
          }
    
    
    export default Enunciado;