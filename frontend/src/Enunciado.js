import React, { Component } from 'react';
import logo from './logo.svg';
import './css/Enunciado.css';
import Registro from './Registro';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import axios from 'axios';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"
var CodeMirror = require('../src/codemirror/CodeMirror.js');
const createReactClass = require('create-react-class');

require('codemirror/lib/codemirror.css');
require('codemirror/mode/python/python');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
var defaults = {
	C: '# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)',
	python: '#Python 2.7'
};

class Enunciado extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateCode = this.updateCode.bind(this); 
        this.changeMode = this.changeMode.bind(this);
        this.limpiarValores = this.limpiarValores.bind(this);
        this.toggleReadOnly = this.toggleReadOnly.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);


        this.state = {
            isLoading: false,
            nameSolution:"",
            nameStatement: "",
            text:"",
            code: defaults.python,
			readOnly: false,
			mode: {name: "python",
            version: 2.7,
            singleLineStringErrors: false},
            lineNumbers: true,
            indentUnit: 4,
            matchBrackets: true,
            sections: [],
            values: [],
            sectionName: "",
            header: "",

        };
    }
    createUI(){
        return this.state.values.map((el, i) => 
            <div key={i}>
               <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
               <input type='button' value='Remover' onClick={this.removeClick.bind(this, i)}/>
            </div>          
        )
     }
   
     handleChange(i, event) {
        let values = [...this.state.values];
        values[i] = event.target.value;
        this.setState({ values });
        console.log(i, values[i])
     }
     
     addClick(){
       this.setState(prevState => ({ values: [...prevState.values, '']}))
     }
     
     removeClick(i){
        let values = [...this.state.values];
        values.splice(i,1);
        this.setState({ values });
     }
    componentDidMount(){
        fetch('http://localhost:8081/sections/allSection')
            .then(response => response.json())
            .then(data => this.setState({sections: data, isLoading: false}));
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
    subirFormulario(e) {
        console.log("formulario enviado c:");

        this.statement = {section: "", nameStatement: "", text: "", testCases: [], code: ""}
        this.statement.nameStatement = e.nameStatement;
        this.statement.text = e.text;
        this.statement.testCases = e.values;
        this.statement.header = e.code;
        this.statement.section = e.sectionName;

        if(this.statement.nameStatement==="" || this.statement.text ==="" ||this.statement.section==="" || this.statement.header==="" ||this.statement.testCases===[]){
            console.log("Debe llenar todos las casillas");
            return;
        }
        else{
            this.limpiarValores(1);
            console.log("Usuario: "+ this.statement);
            console.log("Datos: "+ this.statement.nameStatement);
            console.log("Datos: "+ this.statement.text);
            console.log("Datos: "+ this.statement.section);
            console.log("Datos: "+ this.statement.header);
            console.log("Datos: "+ this.statement.testCases);
            this.statement.testCases.forEach(element => {
                console.log("uguu" + element);
            });
            //fetch('http://104.236.68.75:8080/backendGrupo5/api/add?codigo='+this.user.codigo+'&nombre='+this.user.nombre+'&fecha='+this.user.fecha+'&categoria='+this.user.categoria+'&precio='+this.user.precio)
            //.then(response => console.log("Producto Agregado"+response)) 
            }
       
        return;
        }
    limpiarValores(i){
        
            this.setState({sectionName: "", nameStatement: "", text: "", values: [], code: defaults.python});
            this.render();
    
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


        render() {
            var options = {
                lineNumbers: true,
                readOnly: this.state.readOnly,
                mode: this.state.mode
            };
                const sections = this.state.sections;
                return (
                <body className="body">
                    <form className="form1">
                    <div className="div1">
                    <label className="label1"> Nombre Enunciado:  </label>
                    </div>
                    <div className="div1">
                        <input className="input" name= "nameStatement" type = "text" value={this.state.nameStatement}
                        onChange = {this.handleInputChange} />
                    </div>
                    <div className="div1">
                    <label className="label2"> Enunciado:  </label>
                    </div>

                    {this.createUI()}        
          <input type='button' value='Agregar Caso de Prueba' onClick={this.addClick.bind(this)}/>
                    
                    
                    <div className="div2">
                        
                        <textarea className="text" name= "text" type = "text" value={this.state.text} 
                        onChange = {this.handleInputChange} />
                    </div>
                    <div className="div6"> <label className="label3"> Seccion:  </label></div>

                    <div className="div6">
                        <select name="sectionName" component="select" onChange = {this.handleInputChange}>
                        <option > </option>
                        {sections.map((section) =>
                    <option key={section.idSection} value={section.idSection}>{section.sectionName}</option>
                        )}
                        
                        </select>
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

                    <div className="div3">
                      <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Subir Enunciado</button>
                      <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>
                    </div>
                  </form>
                </body>
                    
                );
            }
          }
    
    
    export default Enunciado;