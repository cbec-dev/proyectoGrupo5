import React, { Component } from 'react';
import logo from './logo.svg';
import qs from 'qs';
import axios from 'axios';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Header from './Header';
import Home from './Home';
import './css/Progreso.css';
import {Button, FormGroup, ControlLabel, FormControl, HelpBlock, Navbar, NavItem, MenuItem, NavDropdown, Nav} from "react-bootstrap"
var ReactDOM = require('react-dom');
const createReactClass = require('create-react-class');


class Progreso extends Component {
    constructor(props) {
        super(props);
        this.changeMode = this.changeMode.bind(this);
        this.changeMode1 = this.changeMode1.bind(this);
        this.state = {
            filter: "career",
            method: "time",
            salida: ""

        };
    }

    changeMode (e) {
        var filter = e.target.value;
        this.setState({
            
            filter: e.target.value
        });
        console.log(this.state.filter)
    }

    changeMode1 (e) {
        var mode = e.target.value;
        this.setState({
            
            method: e.target.value
        });
        console.log(this.state.method)
    }
    buscar(e) {
        
        this.progreso = {filter: "", method: ""}
        
        
        this.progreso.filter = e.filter;
        this.progreso.method = e.mode;
        var algo = {filter: "", method: ""}
        algo.filter = "seccion";
        algo.method = "tiempo";
        var filter = e.filter;


        var bodyFormData = new FormData();
        bodyFormData.set('filter', e.code);
        bodyFormData.set('method', e.name);
        axios({
            method: 'post',
            url: 'http://209.97.152.30:8080/backendGrupo5/api/compiler/getStats',
            data: bodyFormData,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "http://209.97.152.30:5050",
                "Access-Control-Allow-Methods": "POST",
            },
         }).then(response => this.setState({salida: response.data})); 
     

           
            // axios({
            //     method: 'post',
            //     url: 'http://209.97.152.30:8080/backendGrupo5/solutions/getStats',
            //     data: qs.stringify(this.progreso),
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //         "Access-Control-Allow-Origin": "http://209.97.152.30:5050",
            //         "Access-Control-Allow-Methods": "POST",
            //     },
            //  }).then(response => this.setState({salida: response.data}));
             
        
    }

        render() {
        
            
           
                return (

                    <body className="body"> 
                    <form className="form">
                    <div className="div1">    
                        <label className="labels"> Escoger de quién desea ver el progreso     </label>
                        <select onChange={this.changeMode} value={this.state.filter}>
                            <option value="section">Secciones</option>
                            <option value="career">Carreras</option>    
                        </select>
                    </div>
                       
                    <div className="div1">
                    <label className="labels"> Escoger las estadísticas que desea ver     </label>
                    <select onChange={this.changeMode1} value={this.state.mode}>
                        <option value="time">Tiempo empleado en resolver problemas</option>
                        <option value="correctSolutions">Soluciones correctas</option>
                    </select>
                    </div>
         
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

          }
    
    
    export default Progreso;