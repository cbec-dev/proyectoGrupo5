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

class MostrarEnunciado extends Component {
    constructor(props) {
        super(props);


        this.state = {
            isLoading: false,
            nameSolution:"",
            nameStatement: "",
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
     }
     componentDidUpdate(){
            this.cm.codeMirror.setValue(this.props.statement.header)
    }   

     getInitialState () {
            return {
                code: this.props.location.state.statement.header,
                nameStatement: this.props.location.state.statement.nameStatement,
                text: this.props.location.state.statement.statementText,
                sectionName: this.props.location.state.statement.section.sectionName,
                readOnly: true,
                mode: {name: "python",
               version: 3,
               singleLineStringErrors: false},
            };



        }

     
     


        render() {
            const statement = this.props.location.state.statement;
            //const header = this.props.statement.header.split("\"");
         
            const initialDate = statement.initialDate.split("T"); 
            const finalDate = statement.finalDate.split("T");
            var options = {
                lineNumbers: true,
                readOnly: true,
                mode: this.state.mode
            };
                return (
                <body className="body">
                    <form className="form1">
                    <div className="div1">
                    <label className="label1"> Nombre Enunciado:  </label>
                    </div>
                    <div className="div1">
                        <input className="input" name= "nameStatement" type = "text" value={statement.statementName}
                        disabled = "true"/>
                    </div>
                    <div className="div1">
                    <label className="label2"> Enunciado:  </label>
                    </div>

                     <div className="div1">
                        <label className="label1"> Fecha Inicial:  </label>
                        </div>
                        <div className="div1">
                            <input className="input" name= "initialDate" type = "text" value={initialDate[0]}
                            onChange = {this.handleInputChange} disabled = "true"/>
                        </div>


                    <div className="div1">
                        <label className="label1"> Fecha Final:  </label>
                        </div>
                        <div className="div1">
                            <input className="input" name= "finalDate" type = "text" value={finalDate[0]}
                            onChange = {this.handleInputChange} disabled = "true"/>
                        </div>
                    
                    <div className="div2">
                        
                        <textarea className="text" name= "text" type = "text" value={statement.statementText} 
                        disabled = "true"/>
                    </div>
                    <div className="div1">
                    <label className="label1"> Seccion:  </label>
                    </div>
                    <div className="div1">
                        <input className="seccion" name= "nameStatement" type = "text" value={statement.section.sectionName}
                         disabled = "true"/>
                    </div>

                    <div className="div2">
                    <label className="labels"> Cabecera Propuesta:  </label>
                    </div>
                   
                    <div className="div3">
				<CodeMirror className="codemirror" ref={el => this.cm = el} value={statement.header} options={options} autoFocus={true} />
		
			</div>
                  </form>
                </body>
                    
                );
            }
          }
    
    
    export default MostrarEnunciado;