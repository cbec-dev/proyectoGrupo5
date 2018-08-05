import { Button } from 'react-bootstrap';
import * as React from 'react';
import './css/ListarSoluciones.css';
import VerSolucion from './verSolucion';
import MostrarSolucion from './MostrarSolucion';

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
            users: [],
            solution: ""
        };
        this.mostrarSolucion = this.mostrarSolucion.bind(this)
        }
    mostrarSolucion(object, type){
        console.log("MOSTRAR SOLUCION" + "-" + type)
        if(type==="enunciado"){
            console.log("MOSTRAR POR STATEMENT")
            fetch('http://209.97.152.30:8080/backendGrupo5/solutions/searchbyStatement/' + object.idStatement)
            .then(response => response.json())
            .then(data => this.setState({solutions: data, isSelectedSolutionStatement: true}))
            .then(console.log("SOLUCIONES -" + object))
        }
        else if(type==="alumno"){
            console.log("Mostrar soluciones alumno")
            this.setState({solution: object, isSelectedSolutionStatement: true})
            

        }
    }
    componentDidMount(){
        if(this.props.activeUser!==null){
            console.log("didMount listar soluciones")
            if(this.props.activeUser.userType===1){
                console.log("ALUMNO OWOWOWO")
                fetch('http://209.97.152.30:8080/backendGrupo5/solutions/searchbyUser/' + this.props.activeUser.idUser)
                .then(response => response.json())
                .then(data => this.setState({solutions: data}))

            }
            else if(this.props.activeUser.userType===2){
                console.log("didMount listar soluciones usuario coordinador c:");
                fetch('http://209.97.152.30:8080/backendGrupo5/users/searchtype/'+"1")
                .then(response => response.json())
                .then(data => this.setState({users: data}))
                .then(fetch('hhttp://209.97.152.30:8080/backendGrupo5/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data})))
                .then(fetch('http://209.97.152.30:8080/backendGrupo5/api/statements/all')
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
        const solutions = this.state.solutions;
        console.log("WENA LXS CABRXS")
        console.log(solutions)
        console.log(this.props.typeUser)
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
        else if(this.props.typeUser===1){
            console.log("ALUMNOOO")
            return (
                <div>
                <p> Mis Soluciones: </p>
                <table id="t03">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Nombre Enunciado</th>
                    <th>Accion</th>
                    
                    
                
                    </tr>
                            {solutions.map((solution) =>
                            
                                
                                   <tr key={solution.idSolution}>
                                        <th>{solution.idSolution}</th>
                                        <th>{solution.solutionName}</th>
                                        <th>{solution.statement.statementName}</th>
                                        <th> <button onClick={(object, type) => this.mostrarSolucion(solution, "alumno")}>Ver Solucion</button></th>

                                    </tr> 
                                
                            
                              )}
                </tbody>
                </table>
                <div>
                    {this.state.isSelectedSolutionStatement ?
                    <MostrarSolucion  statement = {this.state.solution.statement} solution={this.state.solution} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
                    null
                    }
                    </div>
            </div>
            
                
            );

        }
        }
}

export default ListarSoluciones;