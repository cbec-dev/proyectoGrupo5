import React, { Component } from 'react';
import logo from './logo.svg';
import './css/Solucion.css';
import Registro from './Registro';
import qs from 'qs';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"
var ReactDOM = require('react-dom');
var CodeMirror = require('../src/codemirror/CodeMirror.js');
const createReactClass = require('create-react-class');

require('codemirror/lib/codemirror.css');
require('codemirror/mode/python/python');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
var defaults = {
	C: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
	python: ''
};

class Solucion extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateCode = this.updateCode.bind(this); 
        this.changeMode = this.changeMode.bind(this);
        this.limpiarValores = this.limpiarValores.bind(this);
        this.toggleReadOnly = this.toggleReadOnly.bind(this);
        this.ejecutarSolucion = this.ejecutarSolucion.bind(this);
        
        this.state = {
            isLoading: false,
            nameSolution:"",
            code: defaults.python,
			readOnly: false,
			mode: {name: "python",
            version: 2.7,
            singleLineStringErrors: false},
            lineNumbers: true,
            indentUnit: 4,
            matchBrackets: true,
            salida: ""

        };
    }
    ejecutarSolucion(e) {
        this.solution = {nameSolution: "", code: "", mode: ""}
        this.solution.nameSolution = e.nameSolution;
        this.solution.code = e.code;
        this.solution.mode = e.mode;
        var code = e.code;
        console.log(this.solution.mode);
        if(this.solution.nameSolution==="" || this.solution.code ===""){
            alert("Debe llenar todas las casillas");
            return;
        }
        else{
            fetch('http://localhost:8081/api/compiler/runCode?code='+this.solution.code+'&lang='+this.solution.mode)
            .then(response => response.json())
            .then(data => this.setState({salida: data.stdout}));
            axios({
                method: 'get',
                url: 'http://localhost:8081/api/compiler/runCode',
                data: qs.stringify(code),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "GET",
                },
             }).then(response => alert(response.data));

        }

        
    }

    
    subirFormulario(e) {
        console.log("formulario enviado c:");
        this.solution = {solutionName: "", solutionText: "", user: "", statement: ""}
        this.solution.solutionName = e.nameSolution;
        this.solution.solutionText = e.code;
        this.solution.idUser = this.props.activeUser.idUser;
        this.solution.idStatement = this.props.statement.idStatement;
        console.log(this.solution.code);
        if(this.solution.nameSolution==="" || this.solution.code===""){
            alert("Debe llenar todas las casillas");
            return;
        }
    
        else{
            this.limpiarValores(1);
            console.log("Usuario: "+ this.solution);
            console.log("Datos: "+ this.solution.solutionName);
            console.log("Datos: "+ this.solution.solutionText);
            var bodyFormData = new FormData();
            axios({
                method: 'post',
                url: 'http://localhost:8081/solutions/add',
                data: qs.stringify(this.solution),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "POST",
                },
             }).then(response => alert(response.data));
            //fetch('http://localhost:8081/api/add?code='+this.solution.code+'&nombre='+this.solution.nameSolution)
            //.then(response => console.log("Solucion Agregado"+response)) 
            //alert('Su solucion fue enviada: ');
    
        }
       
        return;
        }
    
    	getInitialState () {
            return {
                code: this.props.statement.header,
                readOnly: false,
                mode: {name: "python",
               version: 3,
               singleLineStringErrors: false},
            };
        }
        updateCode (newCode) {
            console.log("CODE CODEMIRROR: " + newCode)
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
            this.setState({isLoading: false, nameSolution:"", code:this.props.statement.header, codeMirrorRender: false});
            this.render();
            CodeMirror;

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
                code: this.props.statement.header,
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
            const header = this.props.statement.header;
            console.log("STATEMENT HEADER: " + header);
            const typeUser = this.props.typeUser;
            if(typeUser===1 || typeUser===2){
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
				<CodeMirror className="codemirror" ref="editor" value={this.props.statement.header} onChange={this.updateCode} options={options} autoFocus={true} />
				<div style={{ marginTop: 10 }} className="div4">
					<select onChange={this.changeMode} value={this.state.mode}>
						<option value="python">Python</option>
						<option value="c">C</option>
                        <option value="java">Java</option>
					</select>
				</div>
			</div>
                    <div className="div1">
                      <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Subir Solucion</button>
                      <button type="button" onClick={(e) => this.ejecutarSolucion(this.state)}>Ejecutar Solucion</button>
                      <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>

                    </div>
                  </form>

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