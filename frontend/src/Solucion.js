import React, { Component } from 'react';
import logo from './logo.svg';
import './css/Solucion.css';
import Registro from './Registro';
import qs from 'qs';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock, Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"
var ReactDOM = require('react-dom');
var CodeMirror = require('../src/codemirror/CodeMirror.js');
const createReactClass = require('create-react-class');

require('codemirror/lib/codemirror.css');
require('codemirror/mode/python/python');
require('codemirror/mode/clike/clike');
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
        this.updateCode2 = this.updateCode2.bind(this); 
        this.updateCode3 = this.updateCode3.bind(this); 
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
            salida4: "",
            name: "",
            secondsElapsed: 0,
            start: "",
            nTest: "",
            sTest: "",
            bool: true,
            c1: "#python",
            c2: "funcion(entradas)",

        };
    }
    ejecutarSolucion(e) {
        console.log(this.state.secondsElapsed)

        this.solution = {code: "", lang: ""}
        var lang = "python";
        this.checkSolutions(e);

        
        this.solution.code = this.state.c1+"\n"+e.code+"\n"+this.state.c2;
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
        alert("Se demoró: "+ this.state.secondsElapsed +" segundos")
        var solution = {solutionName: "", solutionText: "", user: "", idStatement: "", time: "", testCasesSuccess: "", testCases: ""}
        solution.solutionName = e.nameSolution;
        solution.solutionText = this.state.c1+"\n"+e.code+"\n"+this.state.c2;
        solution.time = this.state.secondsElapsed;
        solution.idUser = this.props.activeUser.idUser;
        solution.idStatement = this.props.statement.idStatement;
        this.checkSolutions(e)
        solution.testCasesSuccess = this.state.sTest
        solution.testCases = this.state.nTest
        console.log("TIME: " + this.state.secondsElapsed);
        console.log(solution.solutionText);
        console.log("owo " + this.state.sTest)
        console.log("uwu " + this.state.nTest)
        if(solution.solutionName==="" || solution.solutionText===""){
            alert("Debe llenar todas las casillas");
            return;
        }
    
        else{
            this.limpiarValores(1);
            console.log(": "+ solution);
            console.log("Datos: "+ solution.solutionName);
            console.log("Datos: "+ solution.solutionText);
            axios({
                method: 'post',
                url: 'http://209.97.152.30:8080/backendGrupo5/solutions/add',
                data: qs.stringify(solution),
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
        updateCode2 (newCode) {
            console.log("CODE CODEMIRROR: " + newCode)
            this.setState({
                code: newCode
            });
        }
        updateCode3 (newCode) {
            console.log("CODE CODEMIRROR: " + newCode)
            this.setState({
                code: newCode
            });
        }
        changeMode (e) {
            var mode = e.target.value;
            if(e.target.value==="c"){
                console.log("IF C");
                this.setState({
                mode: "text/x-csrc",
                name: e.target.value,
                c1: "#include <stdio.h>\n",
                c2: "\nint main(){\nfuncion(entradas);\nreturn 0;\n}",
            });
            }
            else if(e.target.value==="python"){
                console.log("IF PYTHON");
                this.setState({
                mode: mode,
                name: e.target.value,
                c1:"#python\n",
                c2: "\nfuncion(entradas)",
            });
            }
            else{
                console.log("IF JAVA");
                this.setState({
                mode: "text/x-java",
                name: e.target.value,
                c1: "public class MyClass {\n",
                c2: "\npublic static void main(String args[]) { \nfuncion(entradas);\n}\n}",
            });
            }
            
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
            this.cm2.codeMirror.setValue(this.state.c1)
            this.cm3.codeMirror.setValue(this.state.c2)
    }
    checkSolutions(e){
        this.mostrarFeedback(e)
        var expected = [];
        var test_cases = [];
        this.props.statement.testCases.map((test) =>
             test_cases.push(test.testCase)   )
        this.props.statement.expectedSolution.map((test) =>
             expected.push(test.expectedSolution)   )
        console.log("DENTRO CHECK SOLUTIONS c:")
        console.log(expected)
        console.log(test_cases)
        console.log(this.state.secondsElapsed)

        this.solution = {code: "", lang: "", expectedSolution: [], testCases: []}
        var lang = "python";
        this.solution.code = e.code;
        this.solution.lang = e.name;
        this.solution.expectedSolution = expected;
        this.solution.testCases = test_cases;
        var bodyFormData = new FormData();
        bodyFormData.set('code', this.state.c1+"\n"+e.code+"\n"+this.state.c2);
        bodyFormData.set('lang', e.name);
        var i = 0;
        for(i = 0; i<expected.length;i++){
            bodyFormData.append('expectedSolution', expected[i]);
        }
        for(i = 0; i<test_cases.length;i++){
            bodyFormData.append('testCases', test_cases[i]);    
        }
        
        console.log("DATOS MANDADOS EN CHECK SOLUTIONS: ")
        console.log(bodyFormData)
            axios({
                method: 'post',
                url: 'http://209.97.152.30:8080/backendGrupo5/api/compiler/checkSolutions',
                data: bodyFormData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "http://209.97.152.30:5050",
                    "Access-Control-Allow-Methods": "POST",
                },
             }).then(response => this.setState({salida4: response.data[0], nTest:response.data[1], sTest: response.data[2], bool: false}));    
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
                <CodeMirror className="codemirror" ref={el => this.cm2 = el} value={this.state.c1} options={options} autoFocus={true} onChange={this.updateCode2} readOnly={true}/>
                <CodeMirror className="codemirror" ref={el => this.cm = el} value={this.props.statement.header} onChange={this.updateCode} options={options} autoFocus={true} />
                <CodeMirror className="codemirror" ref={el => this.cm3 = el} value={this.state.c2} options={options} autoFocus={true} onChange={this.updateCode3} readOnly={true}/>
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
                      <Button bsStyle="primary" type="button" onClick={(e) => this.subirFormulario(this.state)} disabled={this.state.bool}>Subir Solucion</Button>
                      <Button type="button" onClick={(e) => this.ejecutarSolucion(this.state) }>Ejecutar Solucion</Button>
                      <Button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</Button>

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
            <div class="divTxt">
                <pre class="gb wf" id="preOutput">
                {this.state.salida4}
                </pre>
            </div>
            <div class="divTxt">
                <pre class="gb wf" id="preOutput">
                N° casos de prueba: {this.state.nTest}
                </pre>
            </div>
            <div class="divTxt">
                <pre class="gb wf" id="preOutput">
                Casos de prueba exitosos: {this.state.sTest}
                </pre>
            </div>
            <div class="divTxt">
                <pre class="gb wf" id="preOutput">
                Porcentaje exito: {100*this.state.sTest/this.state.nTest}%
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