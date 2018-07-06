import { Button } from 'react-bootstrap';
import * as React from 'react';
import './css/ListarSoluciones.css';
import VerSolucion from './verSolucion';

class ListarSoluciones extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            solutions: [],
            statements: [],
            statement:"",
            section: "",
            isLoading: false,
            isSelected: false,
            isSelectedSolutionStatement: false,
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
    mostrarSolucion(object, type){
        console.log("MOSTRAR SOLUCION" + "-" + type)
        if(type==="enunciado"){
            console.log("MOSTRAR POR STATEMENT")
            fetch('http://localhost:8081/solutions/searchbyStatement/' + object.idStatement)
            .then(response => response.json())
            .then(data => this.setState({solutions: data, isSelectedSolutionStatement: true}))
            .then(console.log("SOLUCIONES -" + object))
        }
    }
    componentDidMount(){
        if(this.props.activeUser!==null){
            console.log("didMount listar soluciones")
            if(this.props.activeUser.typeUser===1){


            }
            else if(this.props.activeUser.userType===2){
                console.log("didMount listar soluciones usuario coordinador c:");
                fetch('http://localhost:8081/users/searchtype/'+"1")
                .then(response => response.json())
                .then(data => this.setState({users: data}))
                .then(fetch('http://localhost:8081/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data})))
                .then(fetch('http://localhost:8081/api/statements/all')
                .then(response => response.json())
                .then(data => this.setState({statements: data})))
            }
            else if(this.props.activeUser.typeUser===3){

            }
        }   

    }
    render() {
        const users = this.state.users;
        const sections = this.state.sections;
        const statements = this.state.statements;
        if(this.props.typeUser===2){
            return (
                <body>
                <div>
                <label> Usuarios </label>
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
                                        <th>{user.section.sectionName}</th>
                                        <th> <button onClick={(object, type) => this.mostrarSolucion(user, "usuario")}>Mostrar Soluciones</button></th>

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
                <label> Secciones </label>
                <table id="t04">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Profesor</th>
                    <th>Accion</th>
                    <th> Accion </th>
                    
                
                    </tr>
                            {sections.map((section) =>
                            
                                
                                   <tr key={section.idSection}>
                                        <th>{section.idSection}</th>
                                        <th>{section.sectionName}</th>
                                        <th>{section.profesor.userName}</th>
                                        <th> <button onClick={(object, type) => this.mostrarSolucion(section, "seccion")}>Mostrar Soluciones</button></th>

                                    </tr> 
                                
                            
                              )}
                </tbody>
                </table>
                <div>
                    {this.state.isSelected ?
                    <VerSolucion  solutions={this.state.solutions} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
                    null
                    }
                    </div>
            </div>

<div>
<label> Enunciados </label>
<table id="t05">
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
                        <th> <button onClick={(object, type) => this.mostrarSolucion(statement, "enunciado")}>Mostrar Soluciones</button></th>
                    </tr> 
                
            
              )}
</tbody>
</table>
<div>
    {this.state.isSelectedSolutionStatement ?
    <VerSolucion  solutions={this.state.solutions} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
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
                    {this.state.isSelectedSolutionStatement ?
                    <VerSolucion  solutions={this.state.solutions} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
                    null
                    }
                    </div>
            </div>
            
                
            );

        }
        }
}

export default ListarSoluciones;