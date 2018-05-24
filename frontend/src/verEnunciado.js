import { Button } from 'react-bootstrap';
import * as React from 'react';
import './css/verEnunciado.css';
import MostrarEnunciado from './MostrarEnunciado';
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
        };
        this.mostrarEnunciados = this.mostrarEnunciados.bind(this)
        }
    mostrarEnunciados(e){
        this.setState({isSelected: true, statement: e})

    }

    render() {
        const statements = this.props.statements;
        const isLoading = this.state.isLoading;
        console.log("VER ENUNCIADO: ")
        console.log(statements)
            return (
                <div>
                            
                <table id="t03">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Seccion</th>
                    <th>Accion</th>
                    
                
                    </tr>
                            {statements.map((statement) =>
                            
                                
                                   <tr key={statement.idStatement}>
                                        <th>{statement.idStatement}</th>
                                        <th>{statement.statementName}</th>
                                        <th>{statement.section.idSection}</th>
                                        <th> <button onClick={(e) => this.mostrarEnunciados(statement)}>Ver Enunciado</button></th>
                                    </tr> 
                                
                            
                              )}
                </tbody>
                </table>
                <div>
                    {this.state.isSelected ?
                    <MostrarEnunciado  statement={this.state.statement} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
                    null
                    }
                    </div>
            </div>
            
                
            );
        
        
        }
}

export default verEnunciado;