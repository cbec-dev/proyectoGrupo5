import React, { Component } from 'react';
import logo from './logo.svg';
import './Solucion.css';
import Registro from './Registro';
import Login from './Login';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"
var ReactDOM = require('react-dom');
var CodeMirror = require('../src/CodeMirror.js');
const createReactClass = require('create-react-class');

require('codemirror/lib/codemirror.css');
require('codemirror/mode/python/python');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
var defaults = {
	C: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
	python: '#Python 3.5'
};

class Solucion extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateCode = this.updateCode.bind(this); 
        this.changeMode = this.changeMode.bind(this);
        this.limpiarValores = this.limpiarValores.bind(this);
        this.toggleReadOnly = this.toggleReadOnly.bind(this);
        
        this.state = {
            isLoading: false,
            nameSolution:"",
            text:"",
            code: defaults.python,
			readOnly: false,
			mode: {name: "python",
               version: 3,
               singleLineStringErrors: false},

        };
    }
    
    subirFormulario(e) {
        console.log("formulario enviado c:");
        this.solution = {nameSolution: "", text: "", code: ""}
        this.solution.nameSolution = e.nameSolution;
        this.solution.text = e.text;
        this.solution.code = e.code;
        console.log(this.solution.code);
        if(this.solution.nameSolution==="" || this.solution.text ===""){
            alert("Debe llenar todas las casillas");
            return;
        }
        else{
            this.limpiarValores(1);
            console.log("Usuario: "+ this.solution);
            console.log("Datos: "+ this.solution.nameSolution);
            console.log("Datos: "+ this.solution.text);
            
            fetch('http://104.236.68.75:8080/backendGrupo5/api/add?codigo='+this.user.codigo+'&nombre='+this.user.nombre+'&fecha='+this.user.fecha+'&categoria='+this.user.categoria+'&precio='+this.user.precio)
            .then(response => console.log("Producto Agregado"+response)) 
            alert('Su solucion fue enviada: ' + this.state.text);
    
        }
       
        return;
        }
    	getInitialState () {
            return {
                code: defaults.python,
                readOnly: false,
                mode: {name: "python",
               version: 3,
               singleLineStringErrors: false},
            };
        }
        updateCode (newCode) {
            this.setState({
                code: newCode
            });
        }
        changeMode (e) {
            var mode = e.target.value;
            this.setState({
                mode: mode,
                code: defaults[mode]
            });
        }
        toggleReadOnly () {
            this.setState({
                readOnly: !this.state.readOnly
            }, () => this.refs.editor.focus());
        }
    limpiarValores(i){
        if(i===1){
            this.setState({isLoading: false, nameSolution:"", code:""});
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
    componentDidMount() {
            this.setState({
                isLoading: false,
                nameSolution:"",
                text:"",
                code: defaults.python,
                readOnly: false,
                mode: {name: "python",
                   version: 3,
                   singleLineStringErrors: false},
    
            });
            }

        render() {
            var options = {
                lineNumbers: true,
                readOnly: this.state.readOnly,
                mode: this.state.mode
            };
                return (
                   <body className="body"> 
                    <form className="form">
                    <div className="div1">
                    <label className="labels"> Nombre Solucion:  </label>
                    </div>
                    <div className="div1">
                        <input name= "nameSolution" type = "text" value={this.state.nameSolution}
                        onChange = {this.handleInputChange} />
                    </div>
                    <div className="div2">
                    <label className="labels"> Solucion:  </label>
                    </div>
                   
                    <div className="div3">
				<CodeMirror className="codemirror" ref="editor" value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
				<div style={{ marginTop: 10 }} className="div4">
					<select onChange={this.changeMode} value={this.state.mode}>
						<option value="python">Python</option>
						<option value="C">C</option>
                        <option value="java">Java</option>
					</select>
				</div>
			</div>
                    <div className="div1">
                      <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Subir Solucion</button>
                      <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>
                    </div>
                  </form>
            </body>
                    
                );
            }
          }
    
    
    export default Solucion;