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
class verEnunciado extends React.Component {

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
            idStatement: ""
        };
        this.mostrarEnunciados = this.mostrarEnunciados.bind(this)
        this.solucionEnunciado = this.solucionEnunciado.bind(this)
        }
    mostrarEnunciados(e){
        this.setState({isSelected: true, statement: e, isSelectedSolution: false})

    }
    solucionEnunciado(e){
        this.setState({isSelectedSolution: true, statement: e, isSelected: false})
        this.props.callBackFromParentStatement(e);
        statement = e;
        //return <Redirect to="/Solucion" render={()=><Solucion statement = {e} typeUser = {this.props.typeUser} idUser = {this.props.activeUser.idUser} history = {this.props.history} activeUser = {this.props.activeUser}/>}/>

        //return <Link to={{
  //pathname: '/Solucion',
  //state: { statement: e }
//}}/>

        /*return this.props.history.push({
            pathname:"/Solucion",
            state:{
                statement:this.state.statement,
                typeUser: this.props.typeUser,
                idUser: this.props.activeUser.idUser,
                history: this.props.history,
                activeUser: this.props.activeUser,

              }
            });*/
        //return <Link to={'/Solucion'+e }>Create Idea</Link>
    }

    render() {

        const statements = this.props.statements; 
        const currentDate = new Date();
        const now = moment();
        const isLoading = this.state.isLoading;
        const r = true;
        const dateFormatted = currentDate.getFullYear() + '-' + (currentDate.getMonth()+1) + '-' + currentDate.getDate() + 'T04:00:00.000+0000';
       
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
                            {statements.map((statement) =>
                            
                                {if(now > moment(statement.finalDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')){
                                    console.log("fecha superada: " + moment(statement.finalDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ') +" - "+ now +" " + moment(statement.finalDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isAfter(now))
                                    return(
                                   <tr key={statement.idStatement}>
                                        <th>{statement.idStatement}</th>
                                        <th>{statement.statementName}</th>
                                        <th>{statement.section.idSection}</th>
                                        <th>{statement.finalDate}</th>
                                        <th> <button onClick={(e) => this.mostrarEnunciados(statement)}>Ver Enunciado</button></th>
                                        <th> <p>Fecha Limite Superada</p></th>
                                    </tr> );
                                }
                                else{
                                    console.log("fecha no superada: " + moment(statement.finalDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ') +" - " + now +" " + moment(statement.finalDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isAfter(now))
                                    return(
                                    <tr key={statement.idStatement}>
                                        <th>{statement.idStatement}</th>
                                        <th>{statement.statementName}</th>
                                        <th>{statement.section.idSection}</th>
                                        <th>{statement.finalDate}</th>
                                        <th> <button onClick={(e) => this.mostrarEnunciados(statement)}>Ver Enunciado</button></th>
                                        <th> <button onClick={(e) => this.solucionEnunciado(statement)}>Subir Solucion</button></th>
                                        

                                    </tr>);
                                }
                            }
                            
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
        <Redirect push to="/Solucion" render={()=><Solucion statement = {this.state.statement} typeUser = {this.props.typeUser} idUser = {this.props.activeUser.idUser} history = {this.props.history} activeUser = {this.props.activeUser}/>}/>:
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
                    <th>Seccion</th>
                    <th>Fecha Entrega</th>
                    <th>Accion</th>
                    <th> Accion </th>
                    
                
                    </tr>
                            {statements.map((statement) =>
                            
                                {if(now > moment(statement.finalDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ')){
                                    console.log("fecha superada: " + moment(statement.finalDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ') +" - "+ now +" " + moment(statement.finalDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isAfter(now))
                                    return(
                                   <tr key={statement.idStatement}>
                                        <th>{statement.idStatement}</th>
                                        <th>{statement.statementName}</th>
                                        <th>{statement.section.idSection}</th>
                                        <th>{statement.finalDate}</th>
                                        <th> <button onClick={(e) => this.mostrarEnunciados(statement)}>Ver Enunciado</button></th>
                                        <th> <p>Fecha Limite Superada</p></th>
                                    </tr> );
                                }
                                else{
                                    console.log("fecha no superada: " + moment(statement.finalDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ') +" - " + now +" " + moment(statement.finalDate, 'YYYY-MM-DDTHH:mm:ss.SSSZ').isAfter(now))
                                    return(
                                    <tr key={statement.idStatement}>
                                        <th>{statement.idStatement}</th>
                                        <th>{statement.statementName}</th>
                                        <th>{statement.section.idSection}</th>
                                        <th>{statement.finalDate}</th>
                                        <th> <button onClick={(e) => this.mostrarEnunciados(statement)}>Ver Enunciado</button></th>
                                        <th> <button onClick={(e) => this.solucionEnunciado(statement)}>Subir Solucion</button></th>
                                        

                                    </tr>);
                                }
                            }
                            
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
                    <Redirect push to="/Solucion" render={()=><Solucion statement = {statement} typeUser = {this.props.typeUser} idUser = {this.props.activeUser.idUser} history = {this.props.history} activeUser = {this.props.activeUser}/>}/>:
                    null
                    }
                    </div>
            </div>
            
                
            );

        }
        }
}

export default verEnunciado;