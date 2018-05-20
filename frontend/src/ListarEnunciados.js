import { Button } from 'react-bootstrap';
import * as React from 'react';
import './css/ListarEnunciados.css';
import Enunciado from './verEnunciado';

class ListarEnunciados extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statements: [],
            statement:"",
            section: "",
            sections:[],
            isLoading: true,
            statementSelected:"",
            isSelected: false,
        };
        this.verEnunciados = this.verEnunciados.bind(this)
        }
    verEnunciados(e){
        fetch('http://localhost:8081/api/statements/search/seccion/'+ e)
        .then(response => response.json())
        .then(data => this.setState({statements: data, isSelected: true}))
        

    }
    componentDidMount() {
        const usuarioActivo = this.props.activeUser;
        if(usuarioActivo!==null &&this.props.typeUser!==null){
            if(this.props.typeUser===1){
                //alumno
                fetch('http://localhost:8081/sections/search/'+ this.props.activeUser.section.idSection)
                .then(response => response.json())
                .then(data => this.setState({section: data, isLoading: false}));
            }
            else if(this.props.typeUser===2){
                //coordinador
                fetch('http://localhost:8081/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data, isLoading: false}));                

            }
            else{
                //profesor
                fetch('http://localhost:8081/sections/search/profesor/'+this.props.activeUser.idUser)
                .then(response => response.json())
                .then(data => this.setState({sections: data, isLoading: false}));
            }
        }
        else{
            this.setState({section: null, sections: null, isLoading: true});
            return;
        }

        
        }

    render() {
        const section = this.state.section;
        const sections = this.state.sections;
        const typeUser = this.props.typeUser;
        const activeUser = this.props.activeUser;
        const isLoading = this.state.isLoading;
        console.log("Secciones: ")
        console.log(sections)
        if (isLoading) {
            return <p>Cargando...</p>;
        }

        if(typeUser===2){
            return (
                <div>
                            
                <table id="t02">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Profesor Encargado</th>
                    <th>Accion</th>
                    
                
                    </tr>
                            {sections.map((section) =>
                            {
                                if(section.profesor!==null){
                                   return <tr key={section.idSection}>
                                        <th>{section.idSection}</th>
                                        <th>{section.sectionName}</th>
                                        <th>{section.profesor.userName}</th>
                                        <th> <button onClick={(e) => this.verEnunciados(section.idSection)}>Ver Enunciados</button></th>
                                    </tr> 
                                }
                            }
                              )}
                </tbody>
                </table>
                <div>
                    <label> the worst </label>
                    {this.state.isSelected ?
                    <Enunciado statements = {this.state.statements} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
                    null
                     }
                </div>
                    
            </div>
            
                
            );
        }
        else if(typeUser===3){
            return (
                <div>
                            
                <table id="t02">
                <tbody>
                    <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Profesor Encargado</th>
                    <th>Accion</th>
                    
                
                    </tr>
                            
                                   <tr key={sections.idSection}>
                                        <th>{sections.idSection}</th>
                                        <th>{sections.sectionName}</th>
                                        <th>{sections.profesor.userName}</th>
                                        <th> <button onClick={(e) => this.verEnunciados(sections.idSection)}>Ver Enunciados</button></th>
                                    </tr> 
                                
                            
                              
                </tbody>
                </table>
                <div>
                    <label> the worst </label>
                    {this.state.isSelected ?
                    <Enunciado statements = {this.state.statements} typeUser = {this.props.typeUser} activeUser = {this.props.activeUser}/>:
                    null
                     }
                </div>
                    
            </div>
            
                
            );
        }
        }
}

export default ListarEnunciados;