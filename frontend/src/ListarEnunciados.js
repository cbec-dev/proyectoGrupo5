import { Button } from 'react-bootstrap';
import * as React from 'react';
import './css/ListarEnunciados.css';

class ListarEnunciados extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            statements: [],
            section: "",
            sections:[],
            isLoading: false
        };
        }

    componentDidMount() {
        const usuarioActivo = this.props.activeUser;
        if(usuarioActivo!==null &&this.props.typeUser!==null){
            if(this.props.typeUser===1){
                fetch('http://localhost:8081/sections/search/'+ usuarioActivo.section.idSection)
                .then(response => response.json())
                .then(data => this.setState({section: data, isLoading: false}));
            }
            else if(this.props.typeUser===2){
                fetch('http://localhost:8081/sections/allSection')
                .then(response => response.json())
                .then(data => this.setState({sections: data, isLoading: false}));                

            }
            else{
                fetch('http://localhost:8081/sections/search/'+usuarioActivo)
                .then(response => response.json())
                .then(data => this.setState({section: data, isLoading: false}));
            }
        }
        else{
            this.setState({section: null, sections: null, isLoading: false});
            return;
        }
        this.setState({isLoading: true});

        
        }

    render() {
        const section = this.state.section;
        const sections = this.state.sections;
        const typeUser = this.props.typeUser;
        const activeUser = this.props.activeUser;
        const isLoading = this.state.isLoading;
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
                    <tr key={section.idSection}>
                        <th>{section.nameSection}</th>
                        <th>{section.profesor.nameUser}</th>
                        <th> UWUWUWUUWUW</th>
                        <th> <button href="/verEnunciado">Ver Enunciado</button></th>
                    </tr> 
                            )}
                </tbody>
                </table>
            </div>

                
            );
        }
        }
}

export default ListarEnunciados;