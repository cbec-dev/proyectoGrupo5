import { Button } from 'react-bootstrap';
import * as React from 'react';
import './css/verSolucion.css';
import VerSolucion from './verSolucion';

class ListarSoluciones extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statements: [],
            statement:"",
            section: "",
            isLoading: false,
            isSelected: false,
            isSelectedSolution:false,
            idStatement: "",
            solutionsBySection: [],
            sections: [],
            solutionsByUser: [],
            allSolutions: [],
            solutionsByStatement: [],
            users: []
        };
        this.mostrarSolucion = this.mostrarSolucion.bind(this)
        }
    mostrarSolucion(e){
        fetch('http://localhost:8081/api/statements/search/seccion/'+ e)
        .then(response => response.json())
        .then(data => this.setState({solutions: data, isSelected: true}))

    }
    componentDidMount(){
        if(this.props.activeUser!==null){
            if(this.props.activeUser.typeUser===1){

            }
            else if(this.props.activeUser.typeUser===2){
                fetch('http://localhost:8081/users/all')
                .then(response => response.json())
                .then(data => this.setState({users: data, isSelected: true}))
                .then(fetch('http://localhost:8081/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data, isSelected: true})))
                .then(fetch('http://localhost:8081/api/statements/all')
                .then(response => response.json())
                .then(data => this.setState({statements: data, isSelected: true})))
            }
            else if(this.props.activeUser.typeUser===3){

            }
        }   

    }
    render() {
        const users = this.state.users;
        const sections = this.state.sections;
        const statements = this.state.statements;
        console.log("VER Soluciones: ")
        console.log(statements)
        if(this.props.typeUser===2){
            return (
                <body>
                <div>
                <Label> Usuarios </Label>
                <table id="t03">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Seccion</th>
                    <th>Accion</th>
                    <th> Accion </th>
                    
                
                    </tr>
                            {users.map((user) =>
                            
                                
                                   <tr key={user.idUser}>
                                        <th>{user.idStatement}</th>
                                        <th>{user.userName}</th>
                                        <th>{user.section.idSection}</th>
                                        <th> <button onClick={(e) => this.mostrarEnunciados(statement)}>Ver Enunciado</button></th>
                                        <th> <button onClick={(e) => this.solucionEnunciado(statement.idStatement)}>Subir Solucion</button></th>

                                    </tr> 
                                
                            
                              )}
                </tbody>
                </table>
                <div>
                    {this.state.isSelected ?
                    <VerSolucion  statement={this.state.statement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
                    null
                    }
                    </div>
            </div>
            
            <div>
                <Label> Secciones </Label>
                <table id="t03">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Seccion</th>
                    <th>Accion</th>
                    <th> Accion </th>
                    
                
                    </tr>
                            {statements.map((statement) =>
                            
                                
                                   <tr key={statement.idStatement}>
                                        <th>{statement.idStatement}</th>
                                        <th>{statement.statementName}</th>
                                        <th>{statement.section.idSection}</th>
                                        <th> <button onClick={(e) => this.mostrarEnunciados(statement)}>Ver Enunciado</button></th>
                                        <th> <button onClick={(e) => this.solucionEnunciado(statement.idStatement)}>Subir Solucion</button></th>

                                    </tr> 
                                
                            
                              )}
                </tbody>
                </table>
                <div>
                    {this.state.isSelected ?
                    <VerSolucion  statement={this.state.statement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
                    null
                    }
                    </div>
            </div>

<div>
<Label> Enunciados </Label>
<table id="t03">
<tbody>
    <tr>
    <th>ID</th>
    <th>Nombre</th>
    <th>Seccion</th>
    <th>Accion</th>
    <th> Accion </th>
    

    </tr>
            {statements.map((statement) =>
            
                
                   <tr key={statement.idStatement}>
                        <th>{statement.idStatement}</th>
                        <th>{statement.statementName}</th>
                        <th>{statement.section.idSection}</th>
                        <th> <button onClick={(e) => this.mostrarEnunciados(statement)}>Ver Enunciado</button></th>
                        <th> <button onClick={(e) => this.solucionEnunciado(statement.idStatement)}>Subir Solucion</button></th>

                    </tr> 
                
            
              )}
</tbody>
</table>
<div>
    {this.state.isSelected ?
    <VerSolucion  statement={this.state.statement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
    null
    }
    </div>
</div>
                </body>
            );
        
        }
        else{
            return (
                <div>
                            
                <table id="t03">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Seccion</th>
                    <th>Accion</th>
                    <th> Accion </th>
                    
                
                    </tr>
                            {statements.map((statement) =>
                            
                                
                                   <tr key={statement.idStatement}>
                                        <th>{statement.idStatement}</th>
                                        <th>{statement.statementName}</th>
                                        <th>{statement.section.idSection}</th>
                                        <th> <button onClick={(e) => this.mostrarEnunciados(statement)}>Ver Enunciado</button></th>
                                        <th> <button onClick={(e) => this.solucionEnunciado(statement.idStatement)}>Subir Solucion</button></th>

                                    </tr> 
                                
                            
                              )}
                </tbody>
                </table>
                <div>
                    {this.state.isSelected ?
                    <VerSolucion  statement={this.state.statement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
                    null
                    }
                    </div>
            </div>
            
                
            );

        }
        }
}

export default ListarSoluciones;