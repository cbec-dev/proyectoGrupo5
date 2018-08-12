import React, { Component } from 'react';
import logo from './logo.svg';
import './css/Enunciado.css';
import Registro from './Registro';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import axios from 'axios';
import qs from 'qs';
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
        this.handleChange2 = this.handleChange2.bind(this);
        this.addClick = this.addClick.bind(this);
        this.removeClick = this.removeClick.bind(this);
        this.state = {
            isLoading: true,
            nameSolution:"",
            nameStatement: "",
            expectedSolution: "",
            testCase: "",
            text:"",
            code: "",
			readOnly: false,
			mode: {name: "python",
            version: 2.7,
            singleLineStringErrors: false},
            lineNumbers: true,
            indentUnit: 4,
            matchBrackets: true,
            sections: [],
            values: [],
            values2: [],
            sectionName: "",
            header: "",

        };
    }
    createUI(){
        return this.state.values.map((el, i) => 
            <div key={i}>
               <input type="text" value={el||''} onChange={this.handleChange.bind(this, i)} />
                <input type="text" value={el||''} onChange={this.handleChange2.bind(this, i)} />
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
     handleChange2(i, event) {
        let values2 = [...this.state.values2];
        values2[i] = event.target.value;
        this.setState({ values2 });
        console.log(i, values2[i])
     }
     addClick(){
       this.setState(prevState => ({ values: [...prevState.values, '']}))
       this.setState(prevState => ({ values2: [...prevState.values2, '']}))
     }
     
     removeClick(i){
        let values = [...this.state.values];
        values.splice(i,1);
        this.setState({ values });
     }
    componentDidMount(){
        if(this.props.typeUser===2){
        fetch('http://209.97.152.30:8080/backendGrupo5/sections/allSection')
            .then(response => response.json())
            .then(data => this.setState({sections: data, isLoading: false}))
            .then(this.setState({
                isLoading: false,
                nameSolution:"",
                text:"",
                code: "",
                finalDate: "",
                initialDate: "",
                readOnly: false,
                mode: {name: "python",
                   version: 3,
                   singleLineStringErrors: false},
                
    
            }));
        }
        else if(this.props.typeUser===3){
            fetch('http://209.97.152.30:8080/backendGrupo5/sections/search/profesor/'+this.props.activeUser.idUser)
            .then(response => response.json())
            .then(data => this.setState({sections: data, isLoading: false, sectionName: data.idSection}));
        }
        else{
            return;
        }
        }
    subirFormulario(e) {

        var statement = {section: "", statementName: "", statementText: "", finalDate: "", initialDate: "", expectedSolution: [], testCases: []}
        var testCases = [];
        var bodyFormData = new FormData();
        bodyFormData.set('section', e.sectionName);
        bodyFormData.set('statementName', e.nameStatement);
        bodyFormData.set('statementText', e.text);
        bodyFormData.set('finalDate', new Date(e.finalDate));
        bodyFormData.set('initialDate', new Date(e.initialDate));
        bodyFormData.set('expectedSolution', e.values);
        bodyFormData.set('header', e.code);
        bodyFormData.set('testCases', e.values2);
        statement.statementName = e.nameStatement;
        statement.statementText =e.text;
        testCases = e.values;
        statement.header = e.code;
        statement.finalDate = new Date(e.finalDate);
        statement.initialDate = new Date(e.initialDate);
        //statement.expectedSolution = e.values;
        statement.expectedSolution = e.values;
        var placeholder = new Date();
        var actual = placeholder.getDate();
        statement.section = e.sectionName;
        statement.testCases = e.values2;
        if(+statement.initialDate>+statement.finalDate){
            alert("fecha de inicio no coincide con fecha termino")
            return;

        }
        if(statement.statementName==="" || statement.statementText ==="" ||statement.section==="" || statement.header==="" ||testCases===[] || statement.expectedSolution===""){
            alert("Debe llenar todas las casillas");
            return;
        }
        else{
            if(this.props.typeUser===2){
            this.limpiarValores(1);
            }
            else{
            this.limpiarValores(2);

            }
           
            //testCases.forEach(element => {
            //    console.log("uguu" + element);
            //});
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8',
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "POST",
                }
                

              };
            //fetch('http://localhost:8081/api/statements/add?statementName='+statement.nameStatement+'&statementText='+statement.text+'&section='+statement.section+'&header='+statement.header)
           //.then(response => console.log("Producto Agregado"+response)) 
            //axios.post('http://localhost:8081/api/statements/add?statementName='+statement.statementName+'&statementText='+statement.statementText+'&section='+statement.section+'&header='+statement.header,axiosConfig)
            //.then(function(response) {
            //console.log(response);
            //}) .catch(function (error) {
            //console.log(error);
            //});

            axios({
                method: 'post',
                url: 'http://209.97.152.30:8080/backendGrupo5/api/statements/add',
                data: bodyFormData,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    "Access-Control-Allow-Origin": "http://localhost:3000",
                    "Access-Control-Allow-Methods": "POST",
                },
             }).then(response => alert(response.data));
            
        
            //axios.post('http://localhost:8081/api/statements/add',statement,axiosConfig)
            //.then(function(response) {
            //console.log(response);
            //}) .catch(function (error) {
            //console.log(error);
            //});
            }
       
        return;
        }
    limpiarValores(i){
        
        if(i===1){
            this.setState({initialDate: "",finalDate: "",nameStatement: "", text: "", values: [],values2: [], code: "", expectedSolution: ""});
            this.cm.codeMirror.setValue("")
            this.render();
        }
        else{
            this.setState({initialDate: "",finalDate: "", nameStatement: "", text: "", values: [],values2: [], code: "", expectedSolution: ""});
            this.cm.codeMirror.setValue("")

        }
    
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name; 
        this.setState({
            [name]: value
            });
        }
        getInitialState () {
            return {
                code: "",
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
            console.log(this.state.code);
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
            const typeUser = this.props.typeUser;
            const activeUser = this.props.activeUser;
            const isLoading = this.state.isLoading;
            var options = {
                lineNumbers: true,
                readOnly: this.state.readOnly,
                mode: this.state.mode
            };
            const sections = this.state.sections;
       
            if(isLoading){
                return <p> Cargando...</p>;
            }
            if(typeUser==2){
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
                        <label className="label1"> Fecha Inicial:  </label>
                        </div>
                        <div className="div1">
                            <input className="input" name= "initialDate" type = "date" value={this.state.initialDate}
                            onChange = {this.handleInputChange} />
                        </div>


                    <div className="div1">
                        <label className="label1"> Fecha Final:  </label>
                        </div>
                        <div className="div1">
                            <input className="input" name= "finalDate" type = "date" value={this.state.finalDate}
                            onChange = {this.handleInputChange} />
                        </div>

                <div className="div1">
                        <label className="label1"> Solución Esperada:  </label>
                        </div>
                  <div className="div1">
                        <input className="input" name= "expectedSolution" type = "text" value={this.state.expectedSolution}
                        onChange = {this.handleInputChange} />
                    </div>

                <div className="div1">
                        <label className="label1"> Caso de prueba:  </label>
                        </div>
                  <div className="div1">
                        <input className="input" name= "testCase" type = "text" value={this.state.testCase}
                        onChange = {this.handleInputChange} />
                    </div>

                    

                    {this.createUI()}        
          <input type='button' value='Agregar solución esperada y caso de prueba' onClick={this.addClick.bind(this)}/>
                    <div className="div1">
                    <label className="label2"> Enunciado:  </label>
                    </div>
                    
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
                    <label className="labels"> Cabecera Propuesta:  </label>
                    </div>
                   
                    <div className="div3">
				<CodeMirror className="codemirror" ref={el => this.cm = el} value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
			</div>

                    <div className="div3">
                      <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Subir Enunciado</button>
                      <button type="button" onClick={(e) => this.limpiarValores(1)}>Limpiar Casillas</button>
                    </div>
                  </form>
                </body>
                    
                );
            }
            else if(typeUser ===3){

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
                        <label className="label1"> Fecha Inicial:  </label>
                        </div>
                        <div className="div1">
                            <input className="input" name= "initialDate" type = "date" value={this.state.initialDate}
                            onChange = {this.handleInputChange} />
                        </div>

                        <div className="div1">
                        <label className="label1"> Fecha Final:  </label>
                        </div>
                        <div className="div1">
                            <input className="input" name= "finalDate" type = "date" value={this.state.finalDate}
                            onChange = {this.handleInputChange} />
                        </div>

                        <div className="div1">
                        <label className="label1"> Solución Esperada:  </label>
                        </div>
                      <div className="div1">
                        <input className="input" name= "expectedSolution" type = "text" value={this.state.expectedSolution}
                        onChange = {this.handleInputChange} />
                       </div>

                      
    
                        {this.createUI()}        
              <input type='button' value='Agregar solución esperada' onClick={this.addClick.bind(this)}/>
                        
                          <div className="div1">
                        <label className="label2"> Enunciado:  </label>
                        </div>
                        <div className="div2">
                            
                            <textarea className="text" name= "text" type = "text" value={this.state.text} 
                            onChange = {this.handleInputChange} />
                        </div>
                        <div className="div6"> <label className="label3"> Seccion:  </label></div>
    
                        <div className="div6">
                            <input name="sectionName" type= "number" value={this.state.sections.idSection} disabled = "true" hidden="true" onChange = {this.handleInputChange}/>      
                       
                        </div>
                        <div className="div6">
                        <input name= "placeholder" value={this.state.sections.sectionName} disabled = "true" />
                        </div>
                        <div className="div2">
                        <label className="labels"> Cabecera Propuesta:  </label>
                        </div>
                       
                        <div className="div3">
                    <CodeMirror className="codemirror" ref={el => this.cm = el} value={this.state.code} onChange={this.updateCode} options={options} autoFocus={true} />
                </div>
    
                        <div className="div3">
                          <button type="button" onClick={(e) => this.subirFormulario(this.state)}>Subir Enunciado</button>
                          <button type="button" onClick={(e) => this.limpiarValores(2)}>Limpiar Casillas</button>
                        </div>
                      </form>
                    </body>
                        
                    );
            }
            else{
                alert("No posee permisos para acceder a esta vista")
                return(
                    <div> {this.props.history.push("/")} </div>
                );
            }
            }
          }
    
    
    export default Enunciado;