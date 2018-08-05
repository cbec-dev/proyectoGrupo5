import { Button } from 'react-bootstrap';
import * as React from 'react';
import {Route, Redirect, Router, Switch} from 'react-router';
import {Link} from 'react-router-dom';
import './css/verEnunciado.css';
import MostrarEnunciado from './MostrarEnunciado';
import Solucion from './Solucion';
import Moment from 'react-moment';
import moment from 'moment';
var statement = "";
class verSolucion extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statements: [],
            statement:"",
            section: "",
            sections:[],
            isLoading: false,
            isSelected: false,
            isSelectedSolution:false,
            isSelectedSolutionStatement: false,
            idStatement: ""
        };
        this.mostrarSolucion = this.mostrarSolucion.bind(this)
        }
    mostrarSolucion(e){
        this.setState({isSelected: false, statement: e, isSelectedSolutionStatement: true})

    }
    componentDidMount(){
        if(this.props.solutions===undefined){
            console.log("CARGANDO...")
            this.setState({isLoading: true})

        }

    }
    render() {

        const isLoading = this.state.isLoading;
        const solutions = this.props.solutions; 
        console.log("SOLUCIONE UWUS: " + solutions)
        console.log(this.props.solutions)
        if(isLoading ===true || solutions===undefined){
            return(<p> Cargando...</p>);
        }
        if(this.props.typeUser===1){
            return (
                <div>
                <table id="t04">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Seccion</th>
                    <th>Fecha Entrega</th>
                    <th>Accion</th>
                    <th> Accion </th>
                    
                
                </tr>
                            {solutions.map((solution) =>
                            
                               
                                    <tr key={statement.idStatement}>
                                        <th>{statement.idStatement}</th>
                                        <th>{statement.statementName}</th>
                                        <th>{statement.section.idSection}</th>
                                        <th>{statement.finalDate}</th>
                                        <th> <button onClick={(e) => this.mostrarEnunciados(statement)}>Ver Enunciado</button></th>
                                        <th> <button onClick={(e) => this.solucionEnunciado(statement)}>Subir Solucion</button></th>
                                        

                                    </tr>
                                
                            
                            
                              )}
                </tbody>
                </table>
                <div>
                    {this.state.isSelected ?
                    <MostrarEnunciado  statement={this.state.statement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser} history = {this.props.history}/>:
                    null
                    }
                    </div>
                <div>
                    {this.state.isSelectedSolution ?
        <Redirect push to="/backendGrupo5/Solucion" render={()=><Solucion statement = {this.state.statement} typeUser = {this.props.typeUser} idUser = {this.props.activeUser.idUser} history = {this.props.history} activeUser = {this.props.activeUser}/>}/>:
                    null
                    }
                    </div>
            </div>
            
                
            );
        
        }
        else{
            return (
                <div>
                            
                <table id="t04">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Enunciado</th>
                    <th>Seccion</th>
                    <th>Accion</th>
                    <th> Accion </th>
                    
                
                    </tr>
                            {solutions.map((solution) =>
                            
                                    
                                    <tr key={solution.idSolution}>
                                        <th>{solution.idSolution}</th>
                                        <th>{solution.solutionName}</th>
                                        <th>{solution.statement.statementName}</th>
                                        <th>{solution.statement.section.sectionName}</th>
                                        <th> <button onClick={(e) => this.mostrarSolucion(statement)}>Ver Solucion</button></th>
                                        

                                    </tr>
                                
                        
                            
                              )}
                </tbody>
                </table>
                <div>
                    {this.state.isSelected ?
                    <MostrarEnunciado  statement={this.state.statement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser} history = {this.props.history}/>:
                    null
                    }
                    </div>
                <div>
                    {this.state.isSelectedSolutionStatement ?
                    <Redirect push to="/backendGrupo5/Solucion" render={()=><Solucion statement = {statement} typeUser = {this.props.typeUser} idUser = {this.props.activeUser.idUser} history = {this.props.history} activeUser = {this.props.activeUser}/>}/>:
                    null
                    }
                    </div>
            </div>
            
                
            );

        }
        }
}

export default verSolucion;