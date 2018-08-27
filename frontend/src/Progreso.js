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
var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;


class Progreso extends Component {
    constructor(props) {
        super(props);
        this.changeMode = this.changeMode.bind(this);
        this.changeMode1 = this.changeMode1.bind(this);
        this.state = {
            filter: "career",
            method: "time",
            headerx: "",
            headery: "",
            stats: [],
            // options: {
            //     animationEnabled: true,
            //     exportEnabled: true,
            //     theme: "light2", //"light1", "dark1", "dark2"
            //     title:{
            //     text: ""},
            //     data: [{
            //         type: "column", //change type to bar, line, area, pie, etc
            //         //indexLabel: "{y}", //Shows y value on all Data Points
            //         indexLabelFontColor: "#5A5757",
            //         indexLabelPlacement: "outside",
            //         dataPoints: []
            //     }]
            // }

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
        
        this.progreso = {filter: "career", method: "time"}
        this.headers = {x: "", y: ""}
        
        
        this.progreso.filter = e.filter;
        this.progreso.method = e.method;

        if(this.progreso.filter==="career"){
            this.headers.x = "Carrera";
        }
        if(this.progreso.filter==="section"){
            this.headers.x = "Sección";
        }
        if(this.progreso.method==="time"){
            this.headers.y = "Tiempo promedio (s)";
        }
        if(this.progreso.method==="correctSolutions"){
            this.headers.y = "Éxito (%)";
        }
        



        var bodyFormData = new FormData();
        bodyFormData.set('filter', e.filter);
        bodyFormData.set('method', e.method);

        console.log(bodyFormData)
        console.log(this.progreso)
        axios({
            method: 'post',
            url: 'http://142.93.191.219:8080/backendGrupo5/api/compiler/getStats',
            data: qs.stringify(this.progreso),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "http://142.93.191.219:5050",
                "Access-Control-Allow-Methods": "POST",
            },
         }).then(response => this.setState({stats: response.data, headerx: this.headers.x, headery: this.headers.y}));
         
         
         //this.state.options.data.dataPoints =this.state.stats;

           
            // axios({
            //     method: 'post',
            //     url: 'http://142.93.191.219:8080/backendGrupo5/solutions/getStats',
            //     data: qs.stringify(this.progreso),
            //     headers: {
            //         'Content-Type': 'application/x-www-form-urlencoded',
            //         "Access-Control-Allow-Origin": "http://142.93.191.219:5050",
            //         "Access-Control-Allow-Methods": "POST",
            //     },
            //  }).then(response => this.setState({salida: response.data}));
             
        
    }

        render() {
            const stats = this.state.stats;
            const headerx = this.state.headerx;
            const headery = this.state.headery;
            const options = this.state.options;
            
           
                return (

                    <body className="body"> 
                    <form className="form">
                    <div className="div1">    
                        <label className="labels">Filtrar por:  </label>
                        <select onChange={this.changeMode} value={this.state.filter}>
                            <option value="section">Secciones</option>
                            <option value="career">Carreras</option>    
                        </select>
                    </div>
                       
                    <div className="div1">
                    <label className="labels">Estadísticas de:  </label>
                    <select onChange={this.changeMode1} value={this.state.mode}>
                        <option value="time">Tiempo promedio</option>
                        <option value="correctSolutions">Porcentaje de éxito</option>
                    </select>
                    </div>
         
                    <div className="div1">
                      <Button bsStyle="primary" type="button" onClick={(e) => this.buscar(this.state)} disabled={this.state.bool}>Obtener Estadísticas</Button>

                    </div>
                  </form>

                {/* <div className="div1">
                    <label classname="labels">Estadísticas: </label>
                </div> */}

                <div className="div2">
                <table id="t03">
                <tbody>
                    <tr>
                    <th>{headerx}</th>
                    <th>{headery}</th>
                    </tr>
                            {stats.map((stat) =>
                            
                            
                                   <tr key={stat.group}>
                                        <th>{stat.group}</th>
                                        <th>{stat.value}</th>
                                    </tr> 
                                
                            
                              )}
                </tbody>
                </table>
                </div>
            </body>
                    
                );
            
            }

          }
    
    
    export default Progreso;