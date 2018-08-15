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
    python: '',
    java: ''
};

class Solucion extends Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.updateCode = this.updateCode.bind(this); 
        this.changeMode = this.changeMode.bind(this);
        this.limpiarValores = this.limpiarValores.bind(this);
        this.toggleReadOnly = this.toggleReadOnly.bind(this);
        this.tick = this.tick.bind(this);
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
            salida: "",
            salida1: "",
            salida2: "",
            salida3: "",
            name: "",
            secondsElapsed: 0,
            start: "",

        };
    }
    ejecutarSolucion(e) {
        console.log(this.state.secondsElapsed)

        this.solution = {code: "", lang: ""}
        var lang = "python";

        
        this.solution.code = e.code;
        this.solution.lang = e.name;
        var algo = {code: "", lang: ""}
        algo.code = "print(33)";
        algo.lang = "python";
        var code = e.code;
        console.log(this.solution);
        var bodyFormData = new FormData();
        bodyFormData.set('code', e.code);
        bodyFormData.set('lang',e.name);
     

            //fetch('http://localhost:8081/api/compiler/runCode?code='+"print()"+"&lang=" + "python")
            //.then(response => response.json())
            //.then(data => this.setState({salida: data.stdout}));
            /*axios.get('http://localhost:8081/api/compiler/runCode', this.solution).then(response => {
             return response.data;
             });*/
           /*axios.post('http://localhost:8081/api/compiler/runCode', {
              headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "POST",
                },
              data: {
                code: e.code,
                lang: e.name
              }
            }).then(response => {
             return response.data;
             })*/
             /*axios({
                method: 'post',
                url: 'http://localhost:8081/api/compiler/runCode',
                data: JSON.stringify(this.solution),
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "POST",
                },
             }).then(response => console.log(response.data));*/
            axios({
                method: 'post',
                url: 'http://209.97.152.30:8080/backendGrupo5/api/compiler/runCode',
                data: qs.stringify(this.solution),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "POST",
                },
             }).then(response => this.setState({salida: response.data.stdout, salida1: response.data.stderr, salida2: response.data.error}));
             this.mostrarFeedback(e);
        
    }
    
        mostrarFeedback(e)
        {
            this.solution = {code: "", lang: ""}   
            this.solution.code = e.code;
            this.solution.lang = e.name;
            var algo = {code: "", lang: ""}
            algo.code = "print(33)";
            algo.lang = "python";
            var code = e.code;
            var bodyFormData = new FormData();
            bodyFormData.set('code', e.code);
            bodyFormData.set('lang',e.name);
            axios({
                    method: 'post',
                    url: 'http://209.97.152.30:8080/backendGrupo5/api/compiler/checkCode',
                    data: qs.stringify(this.solution),
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        "Access-Control-Allow-Origin": "http://localhost:3000",
                        "Access-Control-Allow-Methods": "POST",
                    },
                    }).then(response => this.setState({salida3: response.data}));
        }

    
    subirFormulario(e) {
        console.log("Se demoró: "+ this.state.secondsElapsed)
        var end = new Date();
        var seconds = (end.getTime()-this.state.start.getTime())/1000
        alert("Se demoró: "+ seconds +" segundos")
        this.solution = {solutionName: "", solutionText: "", user: "", statement: "", time: ""}
        this.solution.solutionName = e.nameSolution;
        this.solution.solutionText = e.code;
        this.time = this.state.secondsElapsed;
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
                url: 'http://209.97.152.30:8080/backendGrupo5/solutions/add',
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
                name: e.target.value,
            });
            console.log(this.state.name)
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
            this.interval = setInterval(this.tick, 1000);
            this.setState({
                isLoading: false,
                nameSolution:"",
                code: this.props.statement.header,
                readOnly: false,
                start: new Date(),
                mode: {name: "python",
                   version: 3,
                   singleLineStringErrors: false},
                name: "python"
    
            });
            //this.cm.codeMirror.setValue(this.props.statement.header)

            }
    componentWillUnmount(){
        clearInterval(this.interval);

    }
    tick(){
       this.setState({secondsElapsed: this.state.secondsElapsed + 1});
       console.log(this.sate.secondsElapsed)
    }
    componentWillReceiveProps(){
          this.setState({
                isLoading: false,
                nameSolution:"",
                code: this.props.statement.header,
                readOnly: false,
                mode: {name: "python",
                   version: 3,
                   singleLineStringErrors: false},
    
            });
            //this.cm.codeMirror.setValue(this.props.statement.header)
            this.render();
    }
    componentDidUpdate(){
            //this.cm.codeMirror.setValue(this.props.statement.header)
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
                    <div className="div1">
                    <p>La tarea fue comenzada hace <b>{this.state.secondsElapsed} </b> segundos.</p>
                    <label classname="labels"> Enunciado: </label>
                    </div>
                    <div className="div2">
                        
                        <textarea className="text" name= "text" type = "text" value={this.props.statement.statementText} 
                        disabled = "true"/>
                    </div>
                    <div className="div1">
                    <label className="labels"> Nombre Solución:  </label>
                    </div>
                    <div className="div1">
                        <input name= "nameSolution" type = "text" value={this.state.nameSolution}
                        onChange = {this.handleInputChange} />
                    </div>
                    <div className="div2">
                    <label className="labels"> Solución:  </label>
                    </div>
                   
                    <div className="div3">
                <CodeMirror className="codemirror" ref={el => this.cm = el} value={this.props.statement.header} onChange={this.updateCode} options={options} autoFocus={true} />
                <div style={{ marginTop: 10 }} className="div4">
                <div className="div1">
                    <label className="labels"> Lenguaje de la Solución:  </label>
                    
                        <select onChange={this.changeMode} value={this.state.name}>
                            <option value="python">Python</option>
                            <option value="c">C</option>
                            <option value="java">Java</option>
                        </select>
                    </div>
                </div>
            </div>
                    <div className="div1">
                      <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Subir Solucion</button>
                      <button type="button" onClick={(e) => this.ejecutarSolucion(this.state) }>Ejecutar Solucion</button>
                      <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>

                    </div>
                  </form>

                <div className="div1">
                    <label classname="labels"> Salida del código: </label>
                </div>  
                <div class="divTxt">
                <pre class="gb wf" id="preOutput">
                {this.state.salida}
                {this.state.salida1}
                {this.state.salida2}
                </pre>
            </div>
            <div className="div1">
                <label classname="labels"> Feedback de la solución propuesta: </label>
            </div>
            <div class="divTxt">
                <pre class="gb wf" id="preOutput">
                {this.state.salida3}
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